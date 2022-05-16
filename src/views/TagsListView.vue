<template>
  <div class="item-viewer">
    <div class="sub-nav">
      <img
        class="back-icon"
        src="/static/arrow_back.svg"
        @click="this.$root.previousPage"
        alt="Back"
      />
      <h1>Collections</h1>
    </div>

    <!-- Tag rendering -->
    <div class="tags-list" v-for="section in sections" :key="section">
      <div class="tags-row" v-if="Array.isArray(section)">
        <div class="tag-item" v-for="tag in section" :key="tag">
          <router-link :to="`/tags/${tag.id}`">
            <img class="tag-item" :src="tag.photoUrl" />
            <span>{{ tag.name }}</span>
          </router-link>
        </div>
      </div>
      <div class="tags-row tag-with-description" v-else>
        <router-link :to="`/tags/${section.id}`">
          <img :src="section.photoUrl" />
        </router-link>
        <div class="description">
          <router-link :to="`/tags/${section.id}`" class="description">
            <h1>{{ section.name }}</h1>
          </router-link>
          <router-link :to="`/tags/${section.id}`" class="description">
            <h3>{{ section.description }}</h3>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// TODO watch window size change and recalculate tags per section
// TODO change display style for the last row so spacing remains consistant

export default {
  data() {
    return {
      sections: null,
    };
  },
  created() {
    const tagWidth = 200;

    this.$root.sanityClient
      .fetch(
        `
    *[_type == "tag"]
    {
    tagName,
    name,
    description,
    "photo": *[_type == "photo" && references(^.name)][0]{objectID, "url": photo.asset->url}
    }`
      )
      .then((res) => {
        if (res === null) {
          this.$router.replace("/error/404");
          return;
        }
        let tagsWithDescription = [];
        let tagsWithoutDescription = [];
        res.map((item) => {
          const url = item.description
            ? this.$root.sanityImgUrlBuilder
                .image(item.photo.url)
                .height(1000)
                .url()
            : this.$root.sanityImgUrlBuilder
                .image(item.photo.url)
                .width(500)
                .height(500)
                .url();

          if (item.description) {
            tagsWithDescription.push({
              id: item.name.replace("tag_", ""),
              name: item.tagName,
              description: item.description,
              photoUrl: url,
            });
          } else {
            tagsWithoutDescription.push({
              id: item.name.replace("tag_", ""),
              name: item.tagName,
              description: "123",
              photoUrl: url,
            });
          }
        });

        // Calculate number of tags per row
        const tagsPerRow = Math.floor(
          document.querySelector("div.item-viewer").offsetWidth /
            (tagWidth + 20)
        );

        let i = 0;
        let tagSections = [];
        let section = [];

        if (tagsWithDescription) {
          tagSections.push(tagsWithDescription.pop());
        }

        let tagsRowCount = 0;
        for (let n = 0; n < tagsWithoutDescription.length; n++) {
          const tag = tagsWithoutDescription[n];

          // build section
          if (i === tagsPerRow) {
            tagSections.push(section);

            // ensures tag with description appears only every two rows
            if (tagsWithDescription.length != 0 && tagsRowCount === 1) {
              tagSections.push(tagsWithDescription.pop());
              tagsRowCount = 0;
            } else {
              tagsRowCount++;
            }

            // reset section
            section = [];
            i = 0;
          }

          section.push(tag);
          i++;

          if (n === tagsWithoutDescription.length - 1) {
            tagSections.push(section);
          }
        }

        // add all remaining elements in tagsWithDescription to the end of the list
        if (tagsWithDescription) {
          tagSections = tagSections.concat(tagsWithDescription);
        }

        this.sections = tagSections;
      });
  },
};
</script>

<style>
.tag-item {
  text-align: center;
  font-family: "silkamedium", sans-serif;
  font-size: 1.3em;
  width: 200px;
}
.tag-item a {
  text-decoration: none;
  color: #08204a;
  cursor: pointer;
}
.tag-item img {
  height: 200px;
  border-radius: 30px;
  cursor: pointer;
}
.tags-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1em;
}
.tags-row.tag-with-description {
  justify-content: start;
  align-items: center;
}
.tags-row.tag-with-description {
  width: 100%;
}
.tags-row.tag-with-description a {
  width: 50%;
  text-decoration: none;
}
.tags-row.tag-with-description .description {
  margin-left: 2em;
  color: #08204a;
}
.tags-row.tag-with-description .description h1 {
  margin-bottom: 0.3em;
}
.tags-row.tag-with-description img {
  height: 200px;
  width: 100%;
  object-fit: cover;
  border-radius: 30px;
}
</style>
