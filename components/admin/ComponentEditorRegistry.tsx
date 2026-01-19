import React from "react";
import TypographyEditor from "./editors/TypographyEditor";
import ImageEditor from "./editors/ImageEditor";
import NavbarEditor from "./editors/NavbarEditor";
import FooterEditor from "./editors/FooterEditor";
import CardEditor from "./editors/CardEditor";
import LayoutEditor from "./editors/LayoutEditor";
import ChipEditor from "./editors/ChipEditor";
import ListEditor from "./editors/ListEditor";
import LinkEditor from "./editors/LinkEditor";
import FormEditor from "./editors/FormEditor";
import InputEditor from "./editors/InputEditor";
import TextareaEditor from "./editors/TextareaEditor";
import SelectEditor from "./editors/SelectEditor";
import CapsuleEditor from "./editors/CapsuleEditor";

type EditorProps = {
  component: any;
  path: string;
};

const ComponentEditorRegistry: React.FC<EditorProps> = ({
  component,
  path,
}) => {
  switch (component.name) {
    /* ===== composite ===== */

    case "navbar":
      return <NavbarEditor component={component} path={path} />;

    case "footer":
      return <FooterEditor component={component} path={path} />;

    /* ===== container ===== */

    case "layout":
      return <LayoutEditor component={component} path={path} />;

    case "list":
      return <ListEditor component={component} path={path} />;

    case "form":
      return <FormEditor component={component} path={path} />;

    /* ===== leaf nodes ===== */

    case "image":
      return <ImageEditor component={component} path={path} />;

    case "typography":
      return <TypographyEditor component={component} path={path} />;

    case "chip":
      return <ChipEditor component={component} path={path} />;

    case "card":
      return <CardEditor component={component} path={path} />;

    case "link":
      return <LinkEditor component={component} path={path} />;

    case "input":
      return <InputEditor component={component} path={path} />;

    case "textarea":
      return <TextareaEditor component={component} path={path} />;

    case "select":
      return <SelectEditor component={component} path={path} />;

    case "capsule":
      return <CapsuleEditor component={component} path={path} />;

    /* ===== transparent fallback ===== */

    default:
      return null;
  }
};

export default ComponentEditorRegistry;
