import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';

interface ModalBottomTabSheetComponentProps {
    children?: React.JSX.Element,
    visible?: boolean,
    setVisible?:any,
    snapPointsProp:string[]
}

const ModalBottomTabSheetComponent: React.FC<ModalBottomTabSheetComponentProps> = ({ children, visible,setVisible,snapPointsProp }) => {
    //bottom sheet

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    // variables
    const snapPoints = useMemo(() => snapPointsProp, []);

    // callbacks
    useEffect(()=>{
        bottomSheetModalRef.current?.present();
    },[])

    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);
    return (
        <BottomSheetModalProvider>

            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={2}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
                overDragResistanceFactor={4}
            >
                <BottomSheetView style={styles.contentContainer}>
                    {children}
                </BottomSheetView>
            </BottomSheetModal>
        </BottomSheetModalProvider>

    )
}

export default ModalBottomTabSheetComponent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        backgroundColor: 'grey',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
})