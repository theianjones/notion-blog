import {
  LoaderFunction,
  redirect,
  useLoaderData,
  json,
  MetaFunction,
} from 'remix'
import {NotionAPI} from 'notion-client'
import {Collection, NotionRenderer, Code} from 'react-notion-x'
import notionStyles from 'react-notion-x/src/styles.css'
import prismStyles from 'prismjs/themes/prism-tomorrow.css'
import notionOverrides from '~/notionOverrides.css'
import collectionStyles from 'rc-dropdown/assets/index.css'

export const links = () => {
  return [
    {rel: 'stylesheet', href: notionStyles},
    {rel: 'stylesheet', href: collectionStyles},
    {rel: 'stylesheet', href: prismStyles},
    {rel: 'stylesheet', href: notionOverrides},
  ]
}

export const meta: MetaFunction = (recordMap) => {
  return {
    title: 'title',
    description: '',
  }
}

const getPageId = (id?: string) => {
  const BLOG_INDEX = 'Blog-Index-e7e7eeb7cc0b4527b47fa8ca6ab04805'
  const slugToId = {
    'about-me': '764500c85f944d5487bab11322730441',
    workouts: 'b8318a5fc3974283a736538f6574267d',
  } as Record<string, string>

  if (!id) {
    return BLOG_INDEX
  }

  return slugToId[id] ?? id
}

export const loader: LoaderFunction = async ({params}) => {
  const notion = new NotionAPI()
  const pageId = getPageId(params['*'])

  if (!pageId) {
    return redirect('/', 404)
  }

  try {
    const recordMap = await notion.getPage(pageId)
    return json(recordMap)
  } catch (e) {
    return {error: e}
  }
}

export default function Page() {
  const recordMap = useLoaderData()
  if (!recordMap) {
    return null
  }

  return (
    <NotionRenderer
      recordMap={recordMap}
      fullPage={true}
      darkMode={false}
      components={{
        collection: Collection,
        code: Code,
      }}
    />
  )
}
