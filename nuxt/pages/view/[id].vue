<template>
  <div class="viewer">
    <ul class="tags">
      <BackButton />
      <li v-for="tag in tags" :key="tag.id">
        <NuxtLink :to="`/tags/${tag.id}`">
          {{ tag.name }}
        </NuxtLink>
      </li>
    </ul>
    <NuxtImg
      class="main-image"
      provider="sanity"
      :height="750"
      :src="imgId"
      :alt="title"
    />
    <h4>{{ objectID }}</h4>
    <h1>{{ title }}</h1>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const { sanityClient, builder: urlBuilder } = useSanity();

const { data, error } = await useAsyncData("photo", () => {
  return sanityClient?.fetch(
    `*[_type == "photo" && objectID == "${fromURLSafe(
      route.params.id as string
    )}"][0]
    {
        objectID,
        title,
        hdlPrefix,
        "imageUrl": photo.asset->url,
        "photo": photo.asset,
        "tags": *[_type == "tag" && _id in ^.tags[]._ref]{name, tagID}
    }`
  );
});

if (error.value) {
  router.replace("/404");
}

const tags = computed(() =>
  data.value?.tags.map((tag: any) => {
    return {
      name: tag.name,
      id: tag.tagID,
    };
  })
);
const imgId = computed(() => data.value?.photo._ref);
const smallUrl = computed(() =>
  urlBuilder?.image(data.value?.imageUrl).width(500).url()
);
const title = computed(() => data.value?.title);
const objectID = computed(() => data.value?.objectID);
</script>

<style scoped>
.viewer {
  text-align: center;
}
.viewer h4 {
  font-family: "Roboto Mono", monospace;
  margin: 0.5em 0;
  color: #08204a;
}
.viewer h1 {
  color: #08204a;
}

.tags {
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  gap: 0.5rem;
  display: flex;
  margin-bottom: 1em;
  align-items: center;
}

.tags::-webkit-scrollbar {
  display: none;
}

.tags a {
  color: white;
  text-decoration: none;
  overflow-x: auto;
}
.tags li {
  font-family: "silkaregular", Tahoma, sans-serif;
  background-color: #505e77;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 30px;
  font-size: 1.3rem;
}

.viewer {
  max-width: 95%;
  margin: 2rem auto;
}
.viewer img.main-image {
  width: 100%;
  height: auto;
  border-radius: 15px;
}
</style>
