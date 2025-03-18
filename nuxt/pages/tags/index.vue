<template>
  <div class="item-viewer">
    <div class="sub-nav">
      <BackButton />
      <h1>Tags</h1>
    </div>

    <section class="tag-list">
      <NuxtLink
        v-for="item in items"
        :key="item.id"
        :to="`/tags/${item.id}`"
        :class="item.description ? 'tag-item description' : 'tag-item'"
      >
        <NuxtImg
          provider="sanity"
          :src="item.imgId"
          height="250"
          width="250"
          fit="cover"
        />
        <div class="tag-info">
          <p>{{ item.name }}</p>
        </div>
        <div v-if="item.description" class="tag-info description">
          <p>
            {{ item.description }}
          </p>
        </div>
      </NuxtLink>
    </section>
  </div>
</template>

<script lang="ts">
type Item = {
  id: string;
  name: string;
  description?: string;
  imgId: string;
};

export default {
  data() {
    return {
      items: [] as Item[],
      tagWidth: 200,
    };
  },
  head() {
    return {
      title: "Olaf Yang | Photography",
    };
  },
  created() {
    const { sanityClient } = useSanity();

    sanityClient
      ?.fetch(
        `
    *[_type == "tag"]
    {
    tagID,
    name,
    description,
    "photo": *[_type == "photo" && references(^._id)][0]{objectID, "id": photo.asset}
    }`
      )
      .then((res) => {
        if (res === null) {
          this.$router.replace("/404");
          return;
        }
        this.items = res.map((item: any) => {
          if (item.description) {
            return {
              id: item.tagID,
              name: item.name,
              description: item.description,
              imgId: item.photo.id._ref,
            };
          } else {
            return {
              id: item.tagID,
              name: item.name,
              imgId: item.photo.id._ref,
            };
          }
        });
      });
  },
  mounted() {
    this.tagWidth = window.innerWidth < 1360 ? 160 : 200;
  },
};
</script>

<style>
.tag-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));

  & p {
    margin: 0 !important;
    text-align: left !important;
  }
}

.tag-item {
  position: relative;
  aspect-ratio: 1;
  display: flex;
  height: auto;
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 3rem;
  box-sizing: border-box;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 10px;
  }
}
.tag-item.description {
  grid-column: span 2;
  aspect-ratio: 2/1;
}

.tag-info {
  position: absolute;
  bottom: -3rem;
  width: calc(100% - 2rem);
  min-height: 45px;
}
.tag-item.description:hover .tag-info {
  opacity: 1;
  transform: translateY(0);
}
.tag-info.description {
  min-height: unset;
  transition-property: opacity, transform;
  transition-duration: 0.1s;
  transition-timing-function: ease-in-out;
  opacity: 0;
  transform: translateY(0.5rem);
  bottom: 1rem;
  left: 1rem;
  padding: 0.75rem;
  box-sizing: border-box;
  height: fit-content;
  background-color: rgba(8, 32, 74, 0.8);
  backdrop-filter: blur(15px);
  font-size: 0.8rem;
  width: calc(100% - 2rem);
  border-radius: 15px;

  & p {
    color: white;
  }
}

@media screen and (max-width: 450px) {
  .tag-list {
    grid-template-columns: 1fr;
  }
  .tag-item.description {
    grid-column: span 1;
    aspect-ratio: 1;
  }
}
</style>
