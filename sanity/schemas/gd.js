export default {
  name: "gd",
  type: "document",
  title: "Grafics Design",
  fields: [
    {
      name: "objectID",
      type: "string",
      title: "Object ID",
      validation: (Rule) => Rule.required().error("Handle Prefix Required"),
    },
    {
      name: "title",
      type: "string",
      title: "Title",
    },
    {
      name: "mainVisual",
      type: "image",
      title: "Main Visual",
      options: {
        hotspot: true,
        metadata: ["blurhash", "lqip", "palette"],
      },
    },
    {
      name: "mainColor",
      type: "string",
      title: "Main Color",
    },
    {
      name: "descriptionBlock",
      type: "array",
      of: [
        { type: "block" },
        { type: "image" },
        {
          type: "object",
          name: "imgCompare",
          fields: [
            {
              name: "aspectRatio",
              type: "number",
              title: "Aspect Ratio",
              description: "Width / Height. Use Image 1 ratio if not specified.",
            },
            { name: "img1", type: "image", title: "Image 1" },
            { name: "img2", type: "image", title: "Image 2" },
            { name: "description", type: "string", title: "Description" },
          ],
        },
      ],
      title: "Description Block",
    },
    {
      name: "tags",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "tag" }],
        },
      ],
      options: {
        layout: "tags",
      },
    },
    {
      name: "clients",
      type: "reference",
      to: { type: "client" },
    },
    {
      name: "hdlPrefix",
      type: "string",
      title: "Handle Prefix",
      initialValue: "20.500.14025",
      validation: (Rule) => Rule.required().error("Handle Prefix Required"),
    },
  ],
};
