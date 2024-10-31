import ChangeTimer from './ChangeTimer.tsx';
import {
    Button,
    Drawer,
    DrawerBody, DrawerCloseButton,
    DrawerContent, DrawerFooter, DrawerHeader,
    DrawerOverlay, Flex, IconButton, Link,
    useDisclosure
} from '@chakra-ui/react';
import {useRef} from "react";
import {MdSettings, MdLink} from "react-icons/md";
import {resetLocalStorage} from "../utils/localstorage/setLocalStorage.ts";

const Sidebar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef(null)

    return (
        <>
            <IconButton icon={<MdSettings />}
                        pos='absolute'
                        top='8px'
                        right='8px'
                        variant='outline'
                        border='none'
                        isRound={true}
                        fontSize='28px'
                        color='red.100'
                        aria-label='Open settings'
                        _hover={{bg: 'none', opacity: .7}}
                        onClick={onOpen}/>

            <Drawer isOpen={isOpen}
                    placement='right'
                    onClose={onClose}
                    finalFocusRef={btnRef}>
                <DrawerOverlay />
                <DrawerContent bg='gray.900' color='red.100'>
                    <DrawerCloseButton />
                    <DrawerHeader>Настройки</DrawerHeader>
                    <DrawerBody>
                        <ChangeTimer/>
                        <Button onClick={resetLocalStorage}>Clear</Button>
                    </DrawerBody>
                    <DrawerFooter justifyContent='flex-start'>
                        <Link href='https://ru.wikipedia.org/wiki/%D0%9C%D0%B5%D1%82%D0%BE%D0%B4_%D0%BF%D0%BE%D0%BC%D0%B8%D0%B4%D0%BE%D1%80%D0%B0#:~:text=tecnica%20del%20pomodoro)%20%E2%80%94%20%D1%82%D0%B5%D1%85%D0%BD%D0%B8%D0%BA%D0%B0%20%D1%83%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D1%8F,%D0%B3%D0%BB%D1%83%D0%B1%D0%BE%D0%BA%D0%BE%D0%B9%20%D0%BA%D0%BE%D0%BD%D1%86%D0%B5%D0%BD%D1%82%D1%80%D0%B0%D1%86%D0%B8%D0%B8%20%D0%B8%20%D0%BA%D0%BE%D1%80%D0%BE%D1%82%D0%BA%D0%B8%D1%85%20%D0%BF%D0%B5%D1%80%D0%B5%D1%80%D1%8B%D0%B2%D0%BE%D0%B2.' isExternal>
                            <Flex gap={2} alignItems='center'><MdLink /> О технике Pomodoro</Flex>
                        </Link>
                    </DrawerFooter>
                </DrawerContent>

            </Drawer>
        </>
    );
};

export default Sidebar;
