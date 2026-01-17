import { ComponentContracts } from "./ComponentContracts";

export function setDeepValue(
  target: any,
  path: (string | number)[],
  value: any,
) {
  let current = target;

  for (let i = 0; i < path.length; i++) {
    const key = path[i];
    const nextKey = path[i + 1];

    // last key → assign
    if (i === path.length - 1) {
      current[key] = value;
      return;
    }

    // create missing container
    if (current[key] == null) {
      current[key] = typeof nextKey === "number" ? [] : {};
    }

    // 🔥 THIS IS WHAT YOU WERE MISSING
    // ensure array index exists before going deeper
    if (Array.isArray(current[key]) && typeof nextKey === "number") {
      while (current[key].length <= nextKey) {
        current[key].push({});
      }
    }

    current = current[key];
  }
}

export function formDataToNestedObject(formData: FormData) {
  const result: any = {};

  for (const [rawKey, rawValue] of formData.entries()) {
    // 🔒 ONLY accept explicit patches
    if (!rawKey.startsWith("patch.")) continue;

    const cleanKey = rawKey.replace(/^patch\./, "");

    const path = cleanKey
      .split(".")
      .map((segment) => (segment.match(/^\d+$/) ? Number(segment) : segment));

    setDeepValue(result, path, rawValue);
  }

  return result;
}

export function applyPatch(target: any, patch: any) {
  //   console.log("applyPatch target type:", Array.isArray(target), target);

  if (Array.isArray(target)) {
    throw new Error("applyPatch must not be used on arrays");
  }

  for (const key in patch) {
    const patchValue = patch[key];
    const targetValue = target[key];

    if (
      typeof patchValue === "object" &&
      patchValue !== null &&
      !Array.isArray(patchValue)
    ) {
      if (!targetValue) target[key] = {};
      applyPatch(target[key], patchValue);
    } else {
      target[key] = patchValue;
    }
  }
}

export function applyComponentPatch(
  nodes: Record<string, any>,
  patch: Record<string, any>,
) {
  for (const key of Object.keys(nodes)) {
    const node = nodes[key];
    const nodePatch = patch?.[key];
    if (!nodePatch) continue;

    // Patch THIS node
    applyPatch(node, nodePatch);

    // Recurse into children (OBJECT, not array)
    if (node.component_data && typeof node.component_data === "object") {
      const structuralProps = getStructuralProps(node.name);

      for (const propName of structuralProps) {
        const targetProp = node.props?.[propName];
        const patchProp = nodePatch.props?.[propName];

        if (targetProp && typeof targetProp === "object") {
          applyComponentPatch(targetProp, patchProp ?? {});
        }
      }

      applyComponentPatch(node.component_data, nodePatch.component_data ?? {});
    }
  }
}

export function normalizeForPatch(component: any) {
  // Convert component_data array into object keyed by `key`
  if (Array.isArray(component.component_data)) {
    component.component_data = Object.fromEntries(
      component.component_data.map((c: any) => [c.key, normalizeForPatch(c)]),
    );
  }

  // Convert any array in props with `key` property
  if (component.props) {
    const structuralProps = getStructuralProps(component.name);

    for (const propName of structuralProps) {
      const prop = component.props[propName];
      if (Array.isArray(prop)) {
        component.props[propName] = Object.fromEntries(
          prop.map((p: any) => [p.key, p]),
        );
      }
    }
  }

  return component;
}

function getStructuralProps(
  nodeName: keyof typeof ComponentContracts,
): string[] {
  return ComponentContracts[nodeName]?.structuralProps ?? [];
}

export function denormalizeComponent(component: any): any {
  // component_data → array
  if (component.component_data && !Array.isArray(component.component_data)) {
    component.component_data = Object.values(component.component_data).map(
      denormalizeComponent,
    );
  }

  // structural props → array
  const structuralProps = getStructuralProps(component.name);

  for (const propName of structuralProps) {
    const prop = component.props?.[propName];
    if (prop && !Array.isArray(prop)) {
      component.props[propName] = Object.values(prop);
    }
  }

  return component;
}
