import React from 'react'
import {
  Modal as BaseModal,
  View,
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native'
import { BlurView } from 'expo-blur'

interface ModalProps {
  visible: boolean
  onClose: () => void
}

const Modal = ({ visible, onClose }: ModalProps) => {
  return (
    <BaseModal visible={visible} transparent>
      <TouchableOpacity style={styles.overlay} onPress={onClose}>
        <BlurView
          style={[StyleSheet.absoluteFill, styles.blur]}
          intensity={100}
          tint='dark'
        />
        <View style={styles.modal}>
          <Text>This is the modal content</Text>
        </View>
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
    backgroundColor: 'white',
    width: 250,
    padding: 16,
    borderRadius: 8
  }
})

export default Modal
