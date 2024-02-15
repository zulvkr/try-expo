import React from 'react'
import {
  Modal as BaseModal,
  View,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native'
import { BlurView } from 'expo-blur'
import { useThemeColor } from './Themed'

export interface ModalProps {
  visible: boolean
  onClose: () => void
  children?: React.ReactNode
  closeOnOverlayClick?: boolean
}

const Modal = ({ visible, onClose, children }: ModalProps) => {
  const backgroundColor = useThemeColor({}, 'background')
  return (
    <BaseModal visible={visible} transparent animationType='fade'>
      <TouchableOpacity
        activeOpacity={0.75}
        style={styles.overlay}
        onPress={onClose}
      >
        <BlurView
          style={[StyleSheet.absoluteFill, styles.blur]}
          intensity={100}
          tint='dark'
        />
        <View style={[{ backgroundColor }, styles.modal]}>{children}</View>
      </TouchableOpacity>
    </BaseModal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  blur: {},
  modal: {
    width: 300,
    padding: 28,
    borderRadius: 16
  }
})

export interface SuccessModalProps extends ModalProps {}

export const SuccessModal = (props: SuccessModalProps) => {
  return (
    <Modal {...props}>
      <Image
        style={successModalStyles.image}
        resizeMode='contain'
        source={require('@/assets/images/success-party.png')}
      />
      {props.children}
    </Modal>
  )
}

const successModalStyles = StyleSheet.create({
  image: {
    height: 160,
    width: '100%'
  }
})

export default Modal
