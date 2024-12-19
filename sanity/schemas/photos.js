export default {
  name: "photo",
  type: "document",
  title: "Photos",
  fields: [
    {
      name: "objectID",
      type: "string",
      title: "Object ID",
      validation: Rule => Rule.required().error("Handle Prefix Required")
    },
    {
      name: "title",
      type: "string",
      title: "Title"
    },
    {
      name: "photo",
      type: "image",
      options: {
        hotspot: true,
        metadata: ["blurhash", "lqip", "palette"]
      },
    },
    {
      name: "artist",
      type: "string",
      title: "Artist",
      initialValue: "OLAF YANG",
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
      name: "hdlPrefix",
      type: "string",
      title: "Handle Prefix",
      initialValue: "20.500.14025",
      validation: Rule => Rule.required().error("Handle Prefix Required")
    }
  ],
};
