import {
  LoaderFunction,
  redirect,
  useLoaderData,
  json,
  MetaFunction,
} from 'remix'
import {NotionAPI} from 'notion-client'
import {Code, Collection, NotionRenderer} from 'react-notion-x'
import notionStyles from 'react-notion-x/src/styles.css'
import prismStyles from 'prismjs/themes/prism-tomorrow.css'
import notionOverridesStyles from '~/notionOverrides.css'
import collectionStyles from 'rc-dropdown/assets/index.css'

export const links = () => {
  return [
    {rel: 'stylesheet', href: notionStyles},
    {rel: 'stylesheet', href: collectionStyles},
    {rel: 'stylesheet', href: prismStyles},
    {rel: 'stylesheet', href: notionOverridesStyles},
  ]
}

export const meta: MetaFunction = () => {
  return {
    title: "Ian's Garden",
    description: 'A place to put my thoughts',
  }
}

const BLOG_INDEX = 'Blog-Index-e7e7eeb7cc0b4527b47fa8ca6ab04805'

export const loader: LoaderFunction = async () => {
  const notion = new NotionAPI()
  const pageId = BLOG_INDEX
  if (!pageId) {
    return redirect('/', 404)
  }
  try {
    const recordMap = await notion.getPage(pageId)
    return json(recordMap)
  } catch (e) {
    console.log(e)
    return {error: e}
  }
}

export default function Page() {
  const recordMap = useLoaderData()
  if (!recordMap) {
    return null
  }
  console.log(recordMap)
  return (
    <NotionRenderer
      recordMap={recordMap}
      darkMode={false}
      components={{
        collection: (props: React.ComponentProps<typeof Collection>) =>
          props.block && <Collection {...props} />,
        code: Code,
      }}
    />
  )
}
