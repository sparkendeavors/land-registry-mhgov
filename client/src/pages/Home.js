import React, { Component } from 'react'
import styled from 'styled-components'
import {
  Header,
  Button,
  Paper,
  Footer,
  TextInput,
  PaperTitle,
  PaperSubTitle,
  Radio,
  PaddingBlank,
  Checkbox,
  Modal,
  SelectBox,
  Close,
  CloseWrap,
  FormDetailsContainer,
  ModalScrollWrapper
} from '../components'
import {
  loginValidator,
  signUpValidator,
  individualValidator,
  bankValidator,
  governmentValidator,
  governmentValidatorModal
} from '../utils/validator'
import house from '../static/images/house.jpeg'
import { Formik, Form, Field } from 'formik'
import axios from 'axios'
import { API_URL, states } from '../constants'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'

const Background = styled.div`
  content: '';
  background-image: url(${house});
  background-size: cover;
  background-repeat: no-repeat;
  z-index: 9;
  min-height: 100vh;
`
const BackgroundWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 140px 70px;
  background: rgba(31, 137, 245, 0.7);
  min-height: 100vh;
  & > div:first-child {
    flex-basis: 50%;
    padding-top: 80px;
  }
  & > div:last-child {
    flex-basis: 40%;
  }
`
const BigText = styled.h1`
  font-size: 70px;
  font-weight: 300;
  letter-spacing: 0.4px;
  color: #ffffff;
`
const MidText = styled.h1`
  font-size: 32px;
  text-shadow: 1px 2px 2px #194984;
  color: #ffffff;
  margin-top: ${props => props.marginTop && props.marginTop};
`
const Wrapper = styled.div`
  & > p {
    font-size: 23px;
    color: #ffffff;
    padding-top: 50px;
  }
  & > div > h6 {
    font-size: 15.5px;
    color: #333333;
    padding-top: 33px;
    text-align: center;
    & > span {
      font-weight: bold;
      cursor: pointer;
    }
  }
`
/* const ForgotPassword = styled.p`
  font-size: 15.5px;
  color: #333333;
  padding: 17px 0 25px 0;
  cursor: pointer;
` */
const FormWrapper = styled.div`
  & input:first-child {
    border-radius: 0px 0px 6px 6px;
    border-bottom: none;
  }
  & input:last-child {
    border-radius: 6px 6px 0 0;
  }
`
const BankFormWrapper = styled.div`
  margin-top: 10px;
  & > div:first-child > input {
    border-radius: 6px 6px 0px 0px;
  }

  & > div:nth-child(2) {
    & > input {
      border-radius: 0;
      border-bottom: none;
    }
  }
  & > div:nth-child(3) > input {
    border-radius: 0 0 6px 6px;
  }
  & > button {
    margin-top: 20px;
  }
`
const SignupFormWrapper = styled.div`
  & > div > input {
    border-radius: 0;
  }
  & > div {
    &:first-child > input {
      border-radius: 6px 6px 0 0;
    }
    &:nth-child(4) > input {
      border-radius: 0 0 6px 6px;
    }
  }
`
const RadioGroup = styled.div`
  padding: ${props => (props.padding ? props.padding : '0px')};
`
const RadioWrap = styled.div`
  & > p {
    padding: 10px 0px;
  }
`
const CheckboxWrap = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  & > span {
    font-size: 14px;
    padding-left: 4px;
  }
`

/* const ButtonWrap = styled.section`
  margin-top: 20px;
` */
const statesOptions = states.map(item => {
  return {
    label: item,
    value: item
  }
})

class Home extends Component {
  state = {
    openModal: false,
    signUpData: {},
    isLoading: false
  }
  handleSignUp = async () => {
    this.setState({
      openModal: false
    })
    this.props.history.push('/')
  }
  handleSignupForm = values => {}

  render() {
    const {
      location: { pathname }
    } = this.props
    const { openModal, signUpData, isLoading } = this.state

    return (
      <Background>
        <Header />
        <BackgroundWrapper>
          <Wrapper>
            <BigText>Welcome To Land Registry</BigText>
            <MidText marginTop="20px;">Government of Maharashtra</MidText>
          </Wrapper>
          <Wrapper>
            <Paper padding={'30px 35px'}>
              <PaperTitle>{pathname === '/signup' ? 'Sign Up' : 'Login'}</PaperTitle>
              {/* <PaperSubTitle>
                {pathname === '/signup'
                  ? 'We connect Global Buyers, Suppliers & Financiers'
                  : 'Lorem ipsum dolor sit amet, consectetur nteger non placerat nisi. Nullam faucibus cursus.'}
              </PaperSubTitle> */}
              {pathname === '/signup' ? (
                <Formik
                  enableReinitialize={true}
                  initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    registerAs: 'individual'
                  }}
                  validate={signUpValidator}
                  validateOnChange
                  onSubmit={formData => {
                    return (
                      this.setState({ signUpData: { ...formData }, openModal: true }), this.handleSignupForm(formData)
                    )
                  }}
                  render={formikBag => (
                    <Form>
                      <SignupFormWrapper>
                        <Field
                          name="firstName"
                          render={({ field }) => (
                            <TextInput
                              {...field}
                              label="First Name"
                              width={'100%'}
                              height={'64px'}
                              type="text"
                              placeholder="First Name"
                              autoFocus
                              required
                              pattern="[a-zA-Z]"
                              error={formikBag.errors.firstName}
                            />
                          )}
                        />
                        <Field
                          name="lastName"
                          render={({ field }) => (
                            <TextInput
                              {...field}
                              label="Last Name"
                              width={'100%'}
                              height={'64px'}
                              type="text"
                              placeholder="Last Name"
                            />
                          )}
                        />
                        <Field
                          name="email"
                          render={({ field }) => (
                            <TextInput
                              {...field}
                              label="Email"
                              width={'100%'}
                              height={'64px'}
                              type="email"
                              placeholder="Email id"
                              required
                              error={formikBag.errors.email}
                            />
                          )}
                        />
                        <Field
                          name="password"
                          render={({ field }) => (
                            <TextInput
                              {...field}
                              label="Password"
                              width={'100%'}
                              height={'64px'}
                              type="password"
                              placeholder="Password"
                              required
                              error={formikBag.errors.password}
                            />
                          )}
                        />
                        <RadioWrap>
                          <PaperSubTitle>Register As</PaperSubTitle>
                          <RadioGroup>
                            <Radio
                              label="Individual"
                              value="individual"
                              name="registerAs"
                              defaultChecked
                              onChange={e => formikBag.setFieldValue('registerAs', e.target.value)}
                            />
                            <Radio
                              label="Bank"
                              value="bank"
                              name="registerAs"
                              onChange={e => formikBag.setFieldValue('registerAs', e.target.value)}
                            />
                            <Radio
                              label="Government"
                              value="government"
                              name="registerAs"
                              onChange={e => formikBag.setFieldValue('registerAs', e.target.value)}
                            />
                          </RadioGroup>
                        </RadioWrap>
                        <CheckboxWrap>
                          <Checkbox name="tnc" defaultChecked required />
                          <span>By continuing you agree to Terms & Conditions</span>
                        </CheckboxWrap>
                        <Button fontSize={20} width={'100%'} height={'50px'} title="Next" type="submit" />
                      </SignupFormWrapper>
                    </Form>
                  )}
                />
              ) : (
                <Formik
                  enableReinitialize={true}
                  initialValues={{
                    email: '',
                    password: ''
                  }}
                  validate={loginValidator}
                  validateOnChange
                  onSubmit={async (values, { resetForm }) => {
                    this.setState({ isLoading: true })
                    try {
                      const { data } = await axios.post(`${API_URL}/login`, {
                        email: values.email,
                        password: values.password
                      })
                      console.log('DATA', data)
                      await Cookies.set('role', data.data.role)
                      await Cookies.set('email', data.data.email)
                      await Cookies.set('address', data.data.address)
                      await Cookies.set('name', data.data.name)
                      await Cookies.set('gender', data.data.gender)
                      this.props.history.push('/dashboard')
                      await this.setState({ isLoading: false })
                      resetForm()
                    } catch (error) {
                      await this.setState({ isLoading: false })
                      toast.error(error.response.data.errMessage, {
                        position: toast.POSITION.TOP_CENTER
                      })
                    }
                  }}
                  render={formikBag => (
                    <Form>
                      <FormWrapper>
                        <Field
                          name="email"
                          render={({ field }) => (
                            <TextInput
                              {...field}
                              label="Email"
                              width={'100%'}
                              height={'64px'}
                              type="email"
                              placeholder="Email Id"
                              autoFocus
                              error={formikBag.errors.email}
                            />
                          )}
                        />
                        <Field
                          name="password"
                          render={({ field }) => (
                            <TextInput
                              {...field}
                              label="Password"
                              width={'100%'}
                              height={'64px'}
                              type="password"
                              placeholder="Password"
                              error={formikBag.errors.password}
                            />
                          )}
                        />
                        {/* <ForgotPassword>Forgot Password ?</ForgotPassword> */}
                        <Button
                          fontSize={20}
                          width={'100%'}
                          isLoading={isLoading}
                          height={'50px'}
                          title={'Next'}
                          type={'submit'}
                        />
                      </FormWrapper>
                    </Form>
                  )}
                />
              )}
              {pathname === '/signup' ? (
                <h6>
                  Already signed up ? <span onClick={() => this.props.history.push('/')}>Login</span>
                </h6>
              ) : (
                <h6>
                  New to Home Registry ? <span onClick={() => this.props.history.push('/signup')}>Register Now</span>
                </h6>
              )}
            </Paper>
          </Wrapper>
        </BackgroundWrapper>
        {signUpData.registerAs === 'individual' && (
          <Modal maxWidth={'1024px'} show={openModal}>
            <Formik
              enableReinitialize={true}
              initialValues={{
                salutation: 'Mr.',
                firstName: signUpData.firstName || '',
                middleName: '',
                lastName: signUpData.lastName || '',
                aliasName: '',
                identificationMark1: '',
                identificationMark2: '',
                dateOfBirth: '',
                age: '',
                uid: '',
                identificationTypeID: '',
                identificationDescription: '',
                panForm60: '',
                occupation: '',
                gender: '',
                email: signUpData.email || '',
                mobileNo: '',
                perAddress: '',
                tempAddress: '',
                addressSame: '',
                district: '',
                taluka: '',
                village: ''
              }}
              validate={individualValidator}
              validateOnChange
              onSubmit={async (values, { resetForm }) => {
                this.setState({ isLoading: true, openModal: false })
                try {
                  const { data } = await axios.post(`${API_URL}/signup/`, {
                    userDetails: {
                      email: this.state.signUpData.email,
                      password: this.state.signUpData.password,
                      role: this.state.signUpData.registerAs,
                      salutation: values.salutation,
                      firstName: values.firstName,
                      middleName: values.middleName,
                      lastName: values.lastName,
                      aliasName: values.aliasName,
                      identityMark1: values.identificationMark1,
                      identityMark2: values.identificationMark2,
                      dob: values.dateOfBirth,
                      age: values.age,
                      uid: values.uid,
                      identityTypeID: values.identificationTypeID,
                      identityDesc: values.identificationDescription,
                      pan: values.panForm60,
                      occupation: values.occupation,
                      gender: values.gender,
                      mobileNo: values.mobileNo,
                      permAddress: values.perAddress,
                      tempAddress: values.tempAddress,
                      district: values.district,
                      taluka: values.taluka,
                      village: values.village
                    }
                  })
                  toast.success(`${'Submitted successfully'}`, {
                    position: toast.POSITION.TOP_CENTER
                  })
                  await this.setState({ isLoading: false, openModal: false })
                  resetForm()
                  console.log('DATA', data)
                } catch (error) {
                  toast.error(error.response.data.errMessage, {
                    position: toast.POSITION.TOP_CENTER
                  })
                  this.setState({ isLoading: false })
                  console.log('ERROR', error)
                }
              }}
              render={formikBag => (
                <Form>
                  <CloseWrap>
                    <PaperTitle color="#fff">Owner Details</PaperTitle>
                    <Close onClick={() => this.setState({ openModal: !openModal })} />
                  </CloseWrap>
                  <ModalScrollWrapper>
                    <FormDetailsContainer>
                      <Field
                        name="salutation"
                        render={({ field }) => (
                          <SelectBox
                            onChange={salutation => formikBag.setFieldValue('salutation', salutation.value)}
                            options={[{ label: 'Mr.', value: 'Mr.' }, { label: 'Mrs.', value: 'Mrs.' }]}
                            placeholder="Salutation"
                            defaultValue={{ label: 'Mr.', value: 'Mr.' }}
                            isSearchable={false}
                            label="Salutaion"
                          />
                        )}
                      />
                      <Field
                        name="firstName"
                        render={({ field }) => (
                          <TextInput
                            {...field}
                            required
                            width={'100%'}
                            height={'64px'}
                            label="First Name"
                            placeholder={'First Name'}
                          />
                        )}
                      />

                      <Field
                        name="middleName"
                        render={({ field }) => (
                          <TextInput
                            {...field}
                            required
                            width={'100%'}
                            height={'64px'}
                            label="Middle Name"
                            placeholder={'Middle Name'}
                          />
                        )}
                      />

                      <Field
                        name="lastName"
                        render={({ field }) => (
                          <TextInput
                            {...field}
                            required
                            width={'100%'}
                            height={'64px'}
                            label="Last Name"
                            placeholder={'Last Name'}
                          />
                        )}
                      />

                      <Field
                        name="aliasName"
                        render={({ field }) => (
                          <TextInput
                            {...field}
                            required
                            width={'100%'}
                            height={'64px'}
                            label="Alias Name"
                            placeholder={'Alias Name'}
                          />
                        )}
                      />

                      <Field
                        name="identificationMark1"
                        render={({ field }) => (
                          <TextInput
                            {...field}
                            required
                            width={'100%'}
                            height={'64px'}
                            label="Identification Mark 1"
                            placeholder={'Identification Mark 1'}
                          />
                        )}
                      />

                      <Field
                        name="identificationMark2"
                        render={({ field }) => (
                          <TextInput
                            {...field}
                            required
                            width={'100%'}
                            height={'64px'}
                            label="Identification Mark 2"
                            placeholder={'Identification Mark 2'}
                          />
                        )}
                      />

                      <Field
                        name="dateOfBirth"
                        render={({ field }) => (
                          <TextInput
                            {...field}
                            required
                            width={'100%'}
                            height={'64px'}
                            label="Date of Birth"
                            placeholder={'Date of Birth'}
                          />
                        )}
                      />

                      <Field
                        name="age"
                        render={({ field }) => (
                          <TextInput
                            {...field}
                            required
                            width={'100%'}
                            height={'64px'}
                            label="Age"
                            placeholder={'Age'}
                          />
                        )}
                      />

                      <Field
                        name="uid"
                        render={({ field }) => (
                          <TextInput
                            {...field}
                            required
                            width={'100%'}
                            height={'64px'}
                            label="UID"
                            placeholder={'UID'}
                          />
                        )}
                      />

                      <Field
                        name="identificationTypeID"
                        render={({ field }) => (
                          <TextInput
                            {...field}
                            required
                            width={'100%'}
                            height={'64px'}
                            label="Identification Type ID"
                            placeholder={'Identification Type ID'}
                          />
                        )}
                      />

                      <Field
                        name="identificationDescription"
                        render={({ field }) => (
                          <TextInput
                            {...field}
                            required
                            width={'100%'}
                            height={'64px'}
                            label="Identification Description"
                            placeholder={'Identification Description'}
                          />
                        )}
                      />

                      <Field
                        name="panForm60"
                        render={({ field }) => (
                          <TextInput
                            {...field}
                            required
                            width={'100%'}
                            height={'64px'}
                            label="PAN/Form 60/61"
                            placeholder={'PAN/Form 60/61'}
                          />
                        )}
                      />

                      <Field
                        name="occupation"
                        render={({ field }) => (
                          <TextInput
                            {...field}
                            required
                            width={'100%'}
                            height={'64px'}
                            label="Occupation"
                            placeholder={'Occupation'}
                          />
                        )}
                      />

                      <Field
                        name="gender"
                        render={({ field }) => (
                          <SelectBox
                            onChange={gender => formikBag.setFieldValue('gender', gender.value)}
                            options={[{ label: 'Male', value: 'Male' }, { label: 'Female', value: 'Female' }]}
                            placeholder="Gender"
                            isSearchable={false}
                            label="Gender"
                          />
                        )}
                      />

                      <Field
                        name="email"
                        render={({ field }) => (
                          <TextInput
                            {...field}
                            required
                            width={'100%'}
                            height={'64px'}
                            label="E-mail"
                            placeholder={'E-mail'}
                            error={formikBag.errors.email}
                          />
                        )}
                      />

                      <Field
                        name="mobileNo"
                        render={({ field }) => (
                          <TextInput
                            {...field}
                            required
                            width={'100%'}
                            height={'64px'}
                            label="Mobile No."
                            placeholder={'Mobile No.'}
                          />
                        )}
                      />

                      <Field
                        name="perAddress"
                        render={({ field }) => (
                          <TextInput
                            {...field}
                            required
                            width={'100%'}
                            height={'64px'}
                            label="Permanent Address"
                            placeholder={'Permanent Address'}
                          />
                        )}
                      />

                      {/* <Field
                      name="addressSame"
                      render={({ field }) => (
                        <TextInput
                          {...field}
                          required
                          width={'100%'}
                          height={'64px'}
                          label="Address Same As Above"
                          placeholder={'Address Same As Above'}
                        />
                      )}
                    /> */}
                      <Field
                        name="tempAddress"
                        render={({ field }) => (
                          <TextInput
                            {...field}
                            required
                            width={'100%'}
                            height={'64px'}
                            label="Temporary Address"
                            placeholder={'Temporary Address'}
                          />
                        )}
                      />

                      <Field
                        name="district"
                        render={({ field }) => (
                          <TextInput
                            {...field}
                            required
                            width={'100%'}
                            height={'64px'}
                            label="District"
                            placeholder={'District'}
                          />
                        )}
                      />

                      <Field
                        name="taluka"
                        render={({ field }) => (
                          <TextInput
                            {...field}
                            required
                            width={'100%'}
                            height={'64px'}
                            label="Taluka"
                            placeholder={'Taluka'}
                          />
                        )}
                      />

                      <Field
                        name="village"
                        render={({ field }) => (
                          <TextInput
                            {...field}
                            required
                            width={'100%'}
                            height={'64px'}
                            label="Village"
                            placeholder={'Village'}
                          />
                        )}
                      />
                      <Button
                        fontSize={20}
                        width={'100%'}
                        // onClick={() => this.handleSignUp()}
                        isLoading={isLoading}
                        disabled={isLoading}
                        height={'50px'}
                        title={'Submit'}
                        type={'submit'}
                        margin={'20px 0 0'}
                      />
                    </FormDetailsContainer>
                  </ModalScrollWrapper>
                </Form>
              )}
            />
          </Modal>
        )}
        {signUpData.registerAs === 'bank' && (
          <Modal show={openModal}>
            <Formik
              enableReinitialize={true}
              initialValues={{
                name: '',
                city: '',
                branch: ''
              }}
              validate={bankValidator}
              validateOnChange
              onSubmit={async (values, { resetForm }) => {
                this.setState({ isLoading: true })
                try {
                  const { data } = await axios.post(`${API_URL}/signup/`, {
                    userDetails: {
                      email: this.state.signUpData.email,
                      password: this.state.signUpData.password,
                      role: this.state.signUpData.registerAs,
                      name: values.name,
                      city: values.city,
                      branch: values.branch
                    }
                  })
                  console.log('DATA', data)
                  this.setState({ isLoading: false, openModal: false })
                  resetForm()
                  toast.success(`${'Submitted successfully'}`, {
                    position: toast.POSITION.TOP_CENTER
                  })
                } catch (error) {
                  console.log('ERROR', error)
                  this.setState({ isLoading: false })
                  toast.error(error.response.data.errMessage, {
                    position: toast.POSITION.TOP_CENTER
                  })
                }
              }}
              render={formikBag => (
                <Form>
                  <CloseWrap>
                    <PaperTitle color>Financer Details</PaperTitle>
                    <Close onClick={() => this.setState({ openModal: !openModal })} />
                  </CloseWrap>
                  <ModalScrollWrapper>
                    <BankFormWrapper>
                      <Field
                        name="name"
                        render={({ field }) => (
                          <TextInput
                            {...field}
                            width={'100%'}
                            height={'64px'}
                            type="text"
                            placeholder="Name"
                            label="Name"
                            autoFocus
                            error={formikBag.errors.name}
                          />
                        )}
                      />
                      <Field
                        name="city"
                        render={({ field }) => (
                          <TextInput
                            {...field}
                            width={'100%'}
                            height={'64px'}
                            type="text"
                            placeholder="City"
                            label="City"
                            error={formikBag.errors.city}
                          />
                        )}
                      />
                      <Field
                        name="branch"
                        render={({ field }) => (
                          <TextInput
                            {...field}
                            width={'100%'}
                            height={'64px'}
                            type="text"
                            placeholder="Branch"
                            label="Branch"
                            error={formikBag.errors.branch}
                          />
                        )}
                      />
                      <Button
                        fontSize={20}
                        width={'100%'}
                        height={'50px'}
                        title={'Submit'}
                        type={'submit'}
                        isLoading={isLoading}
                        disabled={isLoading}
                      />
                    </BankFormWrapper>
                  </ModalScrollWrapper>
                </Form>
              )}
            />
          </Modal>
        )}
        {signUpData.registerAs === 'government' && (
          <Modal show={openModal}>
            <Formik
              enableReinitialize={true}
              initialValues={{
                name: '',
                state: 'Maharashtra',
                department: 'Housing and Urban Development',
                govType: 'igr'
              }}
              validate={governmentValidatorModal}
              validateOnChange
              onSubmit={async (values, { resetForm }) => {
                this.setState({ isLoading: true, openModal: false })
                try {
                  const { data } = await axios.post(`${API_URL}/signup/`, {
                    userDetails: {
                      email: this.state.signUpData.email,
                      password: this.state.signUpData.password,
                      role: values.govType,
                      name: values.name,
                      state: values.state,
                      dept: values.department
                    }
                  })
                  console.log('DATA', data)
                  this.setState({ isLoading: false, openModal: false }, () => this.props.history.push('/'))
                  resetForm()
                  toast.success(`${'Submitted successfully'}`, {
                    position: toast.POSITION.TOP_CENTER
                  })
                } catch (error) {
                  console.log('ERROR', error)
                  this.setState({ isLoading: false })
                  toast.error(error.response.data.errMessage, {
                    position: toast.POSITION.TOP_CENTER
                  })
                }
              }}
              render={formikBag => (
                <Form>
                  <CloseWrap>
                    <PaperTitle color>Government Details</PaperTitle>
                    <Close onClick={() => this.setState({ openModal: !openModal })} />
                  </CloseWrap>
                  <ModalScrollWrapper>
                    <BankFormWrapper>
                      <RadioGroup padding={'20px 0'}>
                        <Radio
                          label="IGR"
                          value="igr"
                          name="govType"
                          checked={formikBag.values.govType === 'igr'}
                          onChange={e => formikBag.setFieldValue('govType', e.target.value)}
                        />
                        <Radio
                          label="Municipal Corporation"
                          value="corporation"
                          name="govType"
                          checked={formikBag.values.govType === 'corporation'}
                          onChange={e => formikBag.setFieldValue('govType', e.target.value)}
                        />
                      </RadioGroup>
                      <Field
                        name="name"
                        render={({ field }) => (
                          <TextInput
                            {...field}
                            width={'100%'}
                            height={'64px'}
                            type="text"
                            placeholder="Name"
                            label="Name"
                            autoFocus
                            error={formikBag.errors.name}
                          />
                        )}
                      />
                      <Field
                        name="state"
                        render={({ field }) => (
                          <SelectBox
                            onChange={state => formikBag.setFieldValue('state', state.value)}
                            options={statesOptions}
                            placeholder="City"
                            label="City"
                          />
                        )}
                      />
                      <PaddingBlank />
                      <Field
                        name="department"
                        render={({ field }) => (
                          <TextInput
                            {...field}
                            width={'100%'}
                            height={'64px'}
                            type="text"
                            placeholder="department"
                            label="Department"
                            required
                            disabled
                          />
                        )}
                      />
                      <Button
                        fontSize={20}
                        width={'100%'}
                        isLoading={isLoading}
                        disabled={isLoading}
                        height={'50px'}
                        title={'Submit'}
                        type={'submit'}
                      />
                    </BankFormWrapper>
                  </ModalScrollWrapper>
                </Form>
              )}
            />
          </Modal>
        )}
        <Footer color={'#fff'} opacity={0.6} position={'fixed'} background={'rgba(31, 137, 245, 0)'} />
      </Background>
    )
  }
}

export { Home }
