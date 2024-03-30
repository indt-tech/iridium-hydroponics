
import { ResourceModel } from '.'
import { DataTable2, Chip, DataView, AdminPage, PaginatedDataSSR  } from 'protolib'
import { InteractiveIcon } from '../../components/InteractiveIcon'
import { ExternalLink, Link } from '@tamagui/lucide-icons'

const ResourceIcons = {}
const sourceUrl = '/adminapi/v1/resources'
export default {
    'resources': {
        component: ({ pageState, initialItems, pageSession }: any) => {
            return (<AdminPage title="Resources" pageSession={pageSession}>
                <DataView
                    integratedChat
                    rowIcon={Link}
                    enableAddToInitialData
                    sourceUrl={sourceUrl}
                    initialItems={initialItems}
                    numColumnsForm={1}
                    name="resource"
                    columns={DataTable2.columns(
                        DataTable2.column("", ()=>"", true, (row) => <a href={row.url} target='_blank'>
                            <InteractiveIcon Icon={ExternalLink}></InteractiveIcon>
                        </a>, true, '50px'),
                        DataTable2.column("name", row => row.name, true, undefined, true, '250px'),
                        DataTable2.column("url", row => row.url, true, undefined, true, '400px'),
                        DataTable2.column("type", row => row.type, true, (row) => <Chip text={row.type} color={'$gray5'} />, true, "150px"),
                        DataTable2.column("tags", row => row.tags, false, (row) => Object.keys(row?.tags ?? []).length ? Object.keys(row.tags).map((k, i) => <Chip ml={i ? '$2' : '$0'} key={k} text={row.tags[k]} color={'$color5'} />) : <Chip text='empty' color={'$gray5'} />, true, '200px')
                    )}
                    model={ResourceModel}
                    pageState={pageState}
                    icons={ResourceIcons}
                />
            </AdminPage>)
        },
        getServerSideProps: PaginatedDataSSR('/adminapi/v1/resources', ['admin'], {})
    }
}