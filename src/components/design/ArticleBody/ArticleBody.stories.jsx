import "@/styles/index.css";
import React from "react";
import { ArticleBody } from "./ArticleBody";

export default {
  title: "Design/ArticleBody",
  component: ArticleBody,
  argTypes: {
    // subtitle / paragraph blocks
    subtitle1: { control: "text", name: "Subtitle 1" },
    paragraph1: { control: "text", name: "Paragraph 1 (HTML allowed)" },
    image1Url: { control: "text", name: "Image 1 — URL" },
    image1Caption: { control: "text", name: "Image 1 — Caption" },
    callout1: { control: "text", name: "Callout 1" },
    subtitle2: { control: "text", name: "Subtitle 2" },
    paragraph2: { control: "text", name: "Paragraph 2 (HTML allowed)" },

    // quote
    quoteText: { control: "text", name: "Quote text" },
    quoteAuthor: { control: "text", name: "Quote author" },
    quotePosition: { control: "text", name: "Quote position" },

    // actions
    onArticleClick: { action: "onArticleClick" },
  },
};

const Template = (args) => {
  const buildContent = () => {
    const blocks = [];

    if (args.subtitle1) {
      blocks.push({ type: "subtitle", content: args.subtitle1 });
    }

    if (args.paragraph1) {
      blocks.push({ type: "paragraph", content: args.paragraph1 });
    }

    if (args.image1Url) {
      blocks.push({
        type: "image",
        url: args.image1Url,
        caption: args.image1Caption || "",
      });
    }

    if (args.callout1) {
      blocks.push({ type: "callout", content: args.callout1 });
    }

    if (args.subtitle2) {
      blocks.push({ type: "subtitle", content: args.subtitle2 });
    }

    if (args.paragraph2) {
      blocks.push({ type: "paragraph", content: args.paragraph2 });
    }

    if (args.quoteText) {
      blocks.push({
        type: "quote",
        quote: args.quoteText,
        author: args.quoteAuthor || "",
        position: args.quotePosition || "",
      });
    }

    return blocks;
  };

  const content = buildContent();

  return (
    <div style={{ padding: 16, maxWidth: 900 }}>
      <ArticleBody content={content} onArticleClick={args.onArticleClick} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  subtitle1: "Introductie",
  paragraph1:
    "<p>Dit is een voorbeeldparagraaf met <strong>opmaak</strong>. Pas deze tekst aan via de controls.</p>",
  image1Url: "/assets/article-sample.jpg",
  image1Caption: "Voorbeeldafbeelding — pas de url aan via controls",
  callout1:
    "Belangrijk: Dit is een callout-blok dat extra aandacht vraagt voor een kort statement.",
  subtitle2: "Diepere uitleg",
  paragraph2:
    "<p>Nog een paragraaf met meer tekst. Gebruik de controls om blokken toe te voegen of te bewerken.</p>",
  quoteText: "Voorbeeldquote die een kernidee samenvat.",
  quoteAuthor: "Jane Doe",
  quotePosition: "Hoofdredacteur",
};

export const LongContent = Template.bind({});
LongContent.args = {
  // genereer lange content in één control set
  subtitle1: "Lange content — Sectie 1",
  paragraph1:
    "<p>Voorbeeldtekst om lange content te simuleren. Kopieer en wijzig deze tekst in de controls om gedrag te testen.</p>",
  subtitle2: "Lange content — Sectie 2",
  paragraph2: "<p>Extra paragraaf voor continue scroll/test.</p>",
};
