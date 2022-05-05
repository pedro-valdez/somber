import sanityClient from "@sanity/client"

export default sanityClient({
  projectId: 'n8a5172y',
  dataset: 'production',
  apiVersion: '2022-05-04',
  useCdn: true,
})
