import ComponentEditorRegistry from "./ComponentEditorRegistry";

type Props = {
  components: any[];
  parentPath?: string;
};

export default function PageComponentTree({
  components,
  parentPath = "component_data",
}: Props) {
  return (
    <div className="space-y-4">
      {components.map((component, index) => {
        const path = `${parentPath}.${index}`;

        return (
          <div key={component.key} className="rounded-md border bg-white overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-50">
              <div>
                <p className="font-medium capitalize">{component.name}</p>
                <p className="text-xs text-gray-500">{component.key}</p>
              </div>
            </div>

            <div className="p-4 space-y-4">
              {/* Editor for this component */}
              <ComponentEditorRegistry component={component} path={path} />

              {/* Children */}
              {component.component_data?.length > 0 && (
                <div className="pl-4 border-l-2 border-l-[#808080]">
                  <PageComponentTree
                    components={component.component_data}
                    parentPath={`${path}.component_data`}
                  />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
