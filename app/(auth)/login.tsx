import { Button } from '@/components/Button'
import Checkbox from '@/components/Checkbox'
import { SuccessModal } from '@/components/Modal'
import { TextInput } from '@/components/TextInput'
import { Text, View, useThemeColor } from '@/components/Themed'
import Colors from '@/constants/Colors'
import { authStore } from '@/stores/authStore'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import { Link, useRouter } from 'expo-router'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
  Text as BaseText,
  Image,
  Platform,
  ScrollView,
  StyleSheet
} from 'react-native'
import { action } from 'mobx'
import { SecondaryText } from '@/components/StyledText'

export default observer(function LoginScreen() {
  const googleBackgroundColor = useThemeColor(
    {
      dark: Colors.dark.textInputBackground
    },
    'background'
  )
  const textColor = useThemeColor({}, 'text')
  const tintColor = useThemeColor({}, 'tint')
  const errorColor = useThemeColor({}, 'errorText')
  const [loginSuccessModalVisible, setLoginSuccessModalVisible] =
    useState(false)
  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting }
  } = useForm({
    defaultValues: {
      email: 'Admin@mail.com',
      password: 'admin'
    }
  })

  const onSubmit = action(async (data: any) => {
    await authStore.login({
      email: data.email,
      password: data.password
    })
  })

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  useEffect(() => {
    if (authStore.loginRequestStatus === 'done' && authStore.isAuth) {
      setLoginSuccessModalVisible(true)
    }
  }, [authStore.loginRequestStatus, authStore.isAuth])

  return (
    <>
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={styles.scrollviewContainer}
      >
        <View style={styles.container}>
          <View style={styles.socialLoginContainer}>
            <Button
              renderLeft={() => (
                <Image
                  source={require('@/assets/images/facebook-icon.png')}
                  style={styles.socialButtonIcon}
                />
              )}
              style={StyleSheet.flatten([
                styles.facebookButton,
                styles.socialButton
              ])}
            >
              Sign in with Facebook
            </Button>
            <Button
              renderLeft={() => (
                <Image
                  source={require('@/assets/images/twitter-icon.png')}
                  style={styles.socialButtonIcon}
                />
              )}
              style={StyleSheet.flatten([
                styles.twitterButton,
                styles.socialButton
              ])}
            >
              Sign in with Twitter
            </Button>
            <Button
              renderLeft={() => (
                <Image
                  source={require('@/assets/images/google-icon.png')}
                  style={styles.socialButtonIcon}
                />
              )}
              style={StyleSheet.flatten([
                { backgroundColor: googleBackgroundColor },
                styles.socialButton
              ])}
            >
              <BaseText style={{ color: textColor }}>
                Sign in with Google
              </BaseText>
            </Button>
          </View>

          <OrSeparator />

          <View>
            {authStore.loginErrorMessage && (
              <Text style={[styles.rootErrorText, { color: errorColor }]}>
                {authStore.loginErrorMessage}
              </Text>
            )}
            <Controller
              control={control}
              rules={{
                required: true
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  renderLeft={isFocused => (
                    <MaterialCommunityIcons
                      name='email'
                      color={textColor}
                      size={21}
                      style={[
                        { opacity: isFocused ? 1 : 0.3 },
                        styles.textInputLeftIcon
                      ]}
                    />
                  )}
                  placeholder='Enter your email'
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  inputMode='email'
                />
              )}
              name='email'
            />
            {errors.email && <Text>This is required.</Text>}
          </View>

          <View>
            <Controller
              control={control}
              rules={{
                required: true
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  renderLeft={isFocused => (
                    <FontAwesome
                      name='lock'
                      color={textColor}
                      size={21}
                      style={[
                        { opacity: isFocused ? 1 : 0.3 },
                        styles.textInputLeftIcon
                      ]}
                    />
                  )}
                  renderRight={isFocused => (
                    <MaterialCommunityIcons
                      name={isPasswordVisible ? 'eye-off' : 'eye'}
                      color={textColor}
                      size={21}
                      style={{ opacity: isFocused ? 1 : 0.3 }}
                      onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                    />
                  )}
                  placeholder='Enter your password'
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry={!isPasswordVisible}
                />
              )}
              name='password'
            />
            {errors.password && <Text>This is required.</Text>}
          </View>

          <Checkbox
            label='Remember password'
            onChange={value => console.log(value)}
          />

          <Button
            loading={isSubmitting}
            disabled={!isValid}
            onPress={handleSubmit(onSubmit)}
            style={styles.loginButton}
          >
            <BaseText style={styles.loginButtonText}>Login</BaseText>
          </Button>

          <View>
            <Text style={styles.signupNowText}>
              Don't have an account?{'  '}
              <Link href='/register' asChild>
                <Text style={{ color: tintColor }}>Sign up now</Text>
              </Link>
            </Text>
          </View>

          <View>
            <Text style={styles.forgetPasswordText}>
              <Text style={{ color: tintColor }}>Forget password?</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
      <SuccessModal visible={loginSuccessModalVisible} onClose={() => {}}>
        <Text style={styles.successModalTitle}>Login successful!</Text>
        <Text style={styles.successModalDescription}>
          Thank you, you have successfully logged in to your Iqlix app
        </Text>
        <Button
          onPress={() => {
            setLoginSuccessModalVisible(false)
            Platform.OS == 'ios'
              ? setTimeout(() => {
                  router.back()
                }, 1000)
              : router.back()
          }}
        >
          Back to Home
        </Button>
      </SuccessModal>
    </>
  )
})

const styles = StyleSheet.create({
  scrollviewContainer: {
    paddingBottom: 40
  },
  container: {
    gap: 20,
    paddingHorizontal: 20
  },
  socialLoginContainer: {
    gap: 16,
    paddingVertical: 16
  },
  facebookButton: {
    backgroundColor: '#007DD1'
  },
  twitterButton: {
    backgroundColor: '#64B4FF'
  },
  socialButton: {
    paddingVertical: 14,
    // android Shadow
    elevation: 3,
    // ios Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62
  },
  socialButtonIcon: {
    width: 28,
    height: 28,
    marginRight: 12
  },
  textInputLeftIcon: {
    marginRight: 12,
    height: 21,
    width: 21
  },
  loginButton: {
    marginVertical: 16
  },
  loginButtonText: {
    fontSize: 16
  },
  signupNowText: {
    textAlign: 'center'
  },
  forgetPasswordText: {
    textAlign: 'center',
    marginTop: 32
  },
  rootErrorText: {
    textAlign: 'center',
    paddingVertical: 8
  },
  successModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  successModalDescription: {
    textAlign: 'center',
    marginVertical: 24
  }
})

function OrSeparator() {
  const textColor = useThemeColor({}, 'textSecondary')
  const borderColor = useThemeColor(
    {
      light: 'rgba(0, 0, 0, 0.1)',
      dark: 'rgba(255, 255, 255, 0.1)'
    },
    'background'
  )

  return (
    <View style={orSeparatorStyles.orSeparatorContainer}>
      <View
        style={[orSeparatorStyles.separator, { backgroundColor: borderColor }]}
      />
      <SecondaryText style={[orSeparatorStyles.orText]}>or</SecondaryText>
      <View
        style={[orSeparatorStyles.separator, { backgroundColor: borderColor }]}
      />
    </View>
  )
}

const orSeparatorStyles = StyleSheet.create({
  orSeparatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  separator: {
    flex: 1,
    height: 1
  },
  orText: {
    marginHorizontal: 8
  }
})
