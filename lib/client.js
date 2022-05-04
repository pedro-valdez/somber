import sanityClient from "@sanity/client"

export default sanityClient({
  projectId: 'n8a5172y',
  dataset: 'production',
  useCdn: true,
})
