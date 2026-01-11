import React from "react";
import Navbar from "./atoms/Navbar";
import Hero from "./atoms/Hero";
import List from "./atoms/List";
import Form from "./atoms/Form";
import Footer from "./atoms/Footer";
import ContentSection from "./atoms/ContentSection";

interface IComponentRegistry {
  component: {
    name: string;
    props?: any;
    variant?: string;
  };
}

const ComponentRegistry: React.FC<IComponentRegistry> = ({ component }) => {
  switch (component.name) {
    case "navbar":
      return <Navbar {...component.props} />;

    case "hero":
      return <Hero {...component.props} />;

    case "list":
      return <List variant={component.variant} {...component.props} />;

    case "form":
      return <Form variant={component.variant} {...component.props} />;

    case "footer":
      return <Footer variant={component.variant} {...component.props} />;

    case "content_section":
      return (
        <ContentSection variant={component.variant} {...component.props} />
      );
    default:
      return <></>;
  }
};

export default ComponentRegistry;
