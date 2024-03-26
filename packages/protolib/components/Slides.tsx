import { XStack, YStack, Text, Stack, Button } from '@my/ui'
import { useState } from 'react'
import { Tinted } from './Tinted'


export const Slides = ({ slides, lastButtonCaption, onFinish, id = "pages" }) => {
    const [step, setStep] = useState(0)
    const totalSlides = slides.length
    const prev_step = step > 1 ? step - 1 : 0
    const post_step = step < totalSlides - 1 ? step + 1 : null

    const titlesUpToCurrentStep = slides
        .filter((_, index) => index <= step)
        .map(slide => slide.name)
        .join(" / ");

    return (
        <YStack id="admin-dataview-create-dlg" w={800} mah={700} p="$3" f={1}>
            <XStack id="admin-eo" mt="$4" justifyContent="space-between" width="100%">
                <Stack flex={1}>
                    <Text fontWeight={"500"} fontSize={16} color="$gray9">{titlesUpToCurrentStep}</Text>
                </Stack>
                <Stack flex={1} alignItems="flex-end">
                    <Text fontWeight={"500"} fontSize={16} color="$gray9">[{step + 1}/{totalSlides}]</Text>
                </Stack>
            </XStack>

            <Tinted>
                <Stack>
                    <Text fontWeight={"600"} fontSize={34} color="$color9">{slides[step].title}</Text>
                </Stack>
            </Tinted>

            <Stack mt={"$6"}>
                {slides[step].component}
            </Stack>

            <XStack gap={40} jc='center' mb={"$5"} flex={1} alignItems="flex-end">
                {step !== 0 ? <Button w={250} onPress={(e) => {
                    e.stopPropagation();
                    if (step > 0) {
                        setStep(prev_step)
                    }
                }} >Back
                </Button> : <></>}
                <Tinted>
                    <Button id={"admin-" + id + "-add-btn"} w={250} onPress={async (e) => {
                        e.stopPropagation();
                        if (post_step) {
                            setStep(post_step)
                        } else {
                            if (onFinish) {
                                await onFinish()
                            }
                        }
                    }} >{totalSlides === step + 1 ? lastButtonCaption : "Next"}
                    </Button>
                </Tinted>
            </XStack>

        </YStack>
    );
}