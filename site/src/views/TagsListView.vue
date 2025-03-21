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
    <div v-for="section in sections" :key="section">
      <div class="tags-row no-description" v-if="Array.isArray(section)">
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
  head() {
    return {
      title: "Olaf Yang | Photography",
    };
  },
  created() {
    const tagWidth = window.innerWidth < 1360 ? 160 : 200;

    this.$root.sanityClient
      .fetch(
        `
    *[_type == "tag"]
    {
    tagID,
    name,
    description,
    "photo": *[_type == "photo" && references(^._id)][0]{objectID, "url": photo.asset->url}
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
              id: item.tagID,
              name: item.name,
              description: item.description,
              photoUrl: url,
            });
          } else {
            tagsWithoutDescription.push({
              id: item.tagID,
              name: item.name,
              description: "",
              photoUrl: url,
            });
          }
        });

        // Calculate number of tags per row
        // const tagsPerRow = 5;
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
.tag-item a {
  text-decoration: none;
  color: #08204a;
  cursor: pointer;
}

@media only screen and (max-width: 1360px) {
  .tags-row {
    text-align: center;
    margin-bottom: 1em;
  }
  .tag-item {
    text-align: center;
    font-family: "silkamedium", sans-serif;
    font-size: 1.3em;
    width: 180px;
  }
  .tag-item img {
    border-radius: 30px;
  }
  .tags-row.no-description {
    display: flex;
    justify-content: space-between;
  }
  .tags-row.tag-with-description img {
    width: 100%;
    border-radius: 30px;
  }
  .description {
    margin-bottom: 1em;
  }
  .description h1 {
    font-size: 2.5em;
  }
  .description h3 {
    font-size: 1.5em;
    color: #08204a;
  }
}
@media only screen and (min-width: 1360px) {
  .tag-item {
    text-align: center;
    font-family: "silkamedium", sans-serif;
    font-size: 1.3em;
    width: 200px;
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
}
</style>
