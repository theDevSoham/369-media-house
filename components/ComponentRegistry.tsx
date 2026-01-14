import React from "react";
import Navbar from "./atoms/Navbar";
import Footer from "./atoms/Footer";

// atomic
import Image from "./atoms/Image";
import Typography from "./atoms/Typography";
import Chip from "./atoms/Chip";
import Layout from "./atoms/Layout";
import List from "./atoms/List";
import Card from "./atoms/Card";
import Link from "./atoms/Link";
import Form from "./atoms/Form";
import Input from "./atoms/Input";
import Textarea from "./atoms/TextArea";
import Select from "./atoms/Select";
import Capsule from "./atoms/Capsule";

interface IComponentRegistry {
  component: {
    name: string;
    props?: any;
    variant?: string;
    layout?: string;
    mode?: string;
  };
  children?: React.ReactNode;
}

const ComponentRegistry: React.FC<IComponentRegistry> = ({
  component,
  children,
}) => {
  switch (component.name) {
    /* ===== composite ===== */

    case "navbar":
      return <Navbar {...component.props} />;

    case "footer":
      return <Footer variant={component?.variant} {...component.props} />;

    /* ===== container ===== */

    case "layout":
      return (
        <Layout
          layout={component.layout as any}
          mode={component.mode as any}
          {...component?.props}
        >
          {children}
        </Layout>
      );

    case "list":
      return <List {...component.props} />;

    case "form":
      return <Form variant={component.variant} {...component.props} />;

    /* ===== leaf nodes ===== */

    case "image":
      return <Image {...component.props} />;

    case "typography":
      return <Typography {...component.props} />;

    case "chip":
      return <Chip {...component.props} />;

    case "card":
      return <Card variant={component.variant} {...component.props} />;

    case "link":
      return <Link {...component.props} />;

    case "input":
      return <Input {...component.props} />;

    case "textarea":
      return <Textarea {...component.props} />;

    case "select":
      return <Select {...component.props} />;

    case "capsule":
      return <Capsule variant={component.variant} {...component.props} />;

    /* ===== transparent fallback ===== */

    default:
      return <>{children}</>;
  }
};

export default ComponentRegistry;
