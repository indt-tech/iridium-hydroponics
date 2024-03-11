/* @my/ui is wrapper for tamagui. Any component in tamagui can be imported through @my/ui
use result = await API.get(url) or result = await API.post(url, data) to send requests
API.get/API.post will return a PendingResult, with properties like isLoaded, isError and a .data property with the result
if you call paginated apis, you will need to wait for result.isLoaded and look into result.data.items, since result.data is an object with the pagination.
Paginated apis return an object like: {"itemsPerPage": 25, "items": [...], "total": 20, "page": 0, "pages": 1}
If you need to insert an image use "source" prop with the following values {uri:"/logo.png", height: 120, width: 120}
Ignore background white, black, or greyscale colors if match with provided wireframe background.
Don't modify export default object
*/

import React from 'react'
import { Theme, YStack, Text, XStack, Paragraph, } from "@my/ui"
import { UIWrapLib, UIWrap, BigTitle, PageGlow, withSession, Page, useEdit, Center, RainbowText, Spacer, API, Tinted, SSR } from "protolib"
import { DefaultLayout, } from "../../../layout/DefaultLayout"
import { Protofy } from 'protolib/base'
import { BentoCheckboxCards, BentoCheckboxList, BentoGroupedCheckbox, BentoStackCheckboxes, BentoInput } from 'app/bundles/protobento'
import { Mail } from '@tamagui/lucide-icons'

const isProtected = Protofy("protected", false)
const { actionFetch } = API;

const PageComponent = (props) => {
    const [values, setValues] = React.useState({})
    React.useEffect(() => {
        console.log('Coffe selection: ', values)
    }, [values])
    return (
        <Page minHeight="100vh">
            <DefaultLayout title="Protofy" description="Made with love from Barcelona">
                {/* add your content here, this is just an example with a big text */}
                <YStack width="100%" mt="$10" ai="center">
                    <BentoInput leftIcon={Mail} label="Email" placeholder="example@example.com" message="We won't share your email"></BentoInput>
                    <BentoCheckboxList title="Coffee" subtitle="Make your choice" items={[
                        {
                            checked: false,
                            title: 'Americano',
                            desc: 'Espresso with hot water',
                            key: 'americano',
                            picture: '/logo.png',
                        },
                        {
                            checked: false,
                            title: 'Cappucino',
                            desc: 'Espresso with steamed milk foam',
                            key: 'cappucino',
                            picture: '/logo.png',
                        },
                        {
                            checked: false,
                            title: 'Espresso',
                            desc: 'A concentrated form of coffee served in shots',
                            key: 'espresso',
                            picture: '/logo.png',
                        },
                        {
                            checked: true,
                            title: 'Flat White',
                            desc: 'Espresso with steamed milk',
                            key: 'flatWhite',
                            picture: '/logo.png',
                        },
                        {
                            title: 'Latte',
                            checked: false,
                            desc: 'Espresso with steamed milk',
                            key: 'latte',
                            picture: '/logo.png',
                        }]}
                        width={400}
                        mt={20}
                        setState={setValues}
                    />

                    <BentoGroupedCheckbox mt={"$5"} items={[
                        {
                            title: 'PayPal',
                            description: 'You will be redirected to the PayPal website',
                            id: 'gr-paypal',
                            checked: false,
                            chip: 'the best',
                            chipColor: 'blue',
                            image: `https://i.pravatar.cc/150?img=20`,
                        },
                        {
                            title: 'Mastercard',
                            description: 'Mastercard secure code is a private code for you',
                            id: 'gr-mastercard',
                            checked: false,
                            image: `https://i.pravatar.cc/150?img=19`,
                        },
                        {
                            title: 'Visa',
                            description: 'This is a secure 128-bit SSL encrypted payment',
                            id: 'gr-visa',
                            checked: false,
                            image: `https://i.pravatar.cc/150?img=18`,
                        },
                    ]} />

                    <BentoStackCheckboxes 
                        title="Payment"
                        subtitle='Select compatible payment methods'
                        width={800}
                        $md={{width: '100%'}}
                        mt={"$10"}
                        items={[
                            {
                                id: 'hor-check-check-paypal-2',
                                label: 'PayPal',
                                description: 'the best method, recommended',
                                checked: false,
                            },
                            {
                                id: 'hor-check-mastercard-2',
                                label: 'Mastercard',
                                description: 'the second best method, recommended',
                                checked: false,
                            },

                            {
                                id: 'hor-check-visa-2',
                                label: 'Visa',
                                description: 'bot very good method indeed',
                                checked: false,
                            },
                        ]}
                    />

                    <BentoStackCheckboxes 
                        title="Payment"
                        subtitle='Select compatible payment methods'
                        width={800}
                        $md={{width: '100%'}}
                        mt={"$10"}
                        items={[
                            {
                                id: 'hor-check-check-paypal-2',
                                label: 'PayPal',
                                checked: false,
                            },
                            {
                                id: 'hor-check-mastercard-2',
                                label: 'Mastercard',
                                checked: false,
                            },

                            {
                                id: 'hor-check-visa-2',
                                label: 'Visa',
                                checked: false,
                            },
                        ]}
                    />
                </YStack>
            </DefaultLayout>
        </Page>
    )
}

const cw = UIWrapLib('@my/ui')

export default {
    route: Protofy("route", "bento"),
    component: (props) => useEdit(
        () => PageComponent(props), {
        ...UIWrap("DefaultLayout", DefaultLayout, "../../../layout/DefaultLayout"),
        ...cw("YStack", YStack),
        ...cw("Text", Text),
        ...cw("XStack", XStack),
        ...cw("Paragraph", Paragraph),
        ...cw("Theme", Theme)
    },
        "/packages/app/bundles/custom/pages/bento.tsx"),
    getServerSideProps: SSR(async (context) => withSession(context, isProtected ? Protofy("permissions", []) : undefined))
}