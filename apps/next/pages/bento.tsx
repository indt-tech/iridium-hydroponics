import Feature from 'app/bundles/custom/pages/bento'
import { useSession } from 'protolib'

export default function BentoPage(props:any) {
  useSession(props.pageSession)
  return <Feature.component {...props} />
}

export const getServerSideProps = Feature.getServerSideProps