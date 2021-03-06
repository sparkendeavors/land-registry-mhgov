import React, { Component } from 'react'
import { Formik, Field } from 'formik'
import styled from 'styled-components'
import {
  Paper,
  FormikForm,
  PaddingBlank,
  FormDetailsContainer,
  TextInput,
  InformTitle,
  Loader,
  NormalFieldsTuple,
  Button,
  HalfWraper,
  ButtonGroup,
  FieldGroupWithTitle,
  SelectBox,
  Close,
  CloseWrap,
  PaperTitle,
  Modal,
  FlexWrapper,
  StyledFlex
} from '../components'
import withRouter from 'react-router/withRouter'
import axios from 'axios'
import { API_URL } from '../constants'
import get from 'lodash/get'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
import { buyerDetailValidation, buyerDetail } from '../utils/validator'

const ModalData = styled('div')`
  padding: 15px;
`
class BuyerDetailsForm extends Component {
  state = {
    isLoading: false,
    isLoadingReject: false,
    isLoadingSkip: false,
    addFinancier: false,
    isVerified: false,
    financerAddress: '',
    addFinancerData: {},
    financerAddedSuccess: false
  }
  componentDidMount() {
    window.scrollTo(0, 0)
    // this.setState({ buyer: this.props.data })
  }
  rejectBuyer = async values => {
    const {
      match: { params }
    } = this.props
    try {
      this.setState({ isLoadingReject: true })
      await axios.post(`${API_URL}/confirmBuyer`, {
        registryId: params.tab3,
        propertyId: Cookies.get('propertyId'),
        status: '_rejected'
      })
      await this.setState({ isLoadingReject: false })
      await toast.success(`${'Rejected!'}`, {
        position: toast.POSITION.TOP_CENTER
      })
      this.props.history.push('/dashboard')
      // console.log('DATA', data)
    } catch (error) {
      await this.setState({ isLoadingReject: false })
      toast.error(error.response.data.errMessage, {
        position: toast.POSITION.TOP_CENTER
      })
      console.log('ERROR', error)
    }
  }
  rejectBuyerFinancer = async values => {
    const {
      match: { params }
    } = this.props
    try {
      this.setState({ isLoading: true })
      await axios.post(`${API_URL}/confirmFinancer`, {
        registryId: params.tab3,
        propertyId: Cookies.get('propertyId'),
        currentStatus: 'registry_buyer_financer',
        approved: false
      })
      await this.setState({ isLoading: false })
      await toast.success(`${'Financier Rejected!'}`, {
        position: toast.POSITION.TOP_CENTER
      })
      this.props.history.push('/dashboard')
      // console.log('DATA', data)
    } catch (error) {
      await this.setState({ isLoading: false })
      toast.error(error.response.data.errMessage, {
        position: toast.POSITION.TOP_CENTER
      })
      console.log('ERROR', error)
    }
  }
  skipFinancier = async () => {
    const {
      match: { params }
    } = this.props

    try {
      this.setState({ isLoadingSkip: true })
      await axios.post(`${API_URL}/addBuyerFinancer`, {
        registryId: params.tab3,
        buyerFinancer: false,
        propertyId: Cookies.get('propertyId'),
        status: 'registry_skip_buyer_financer'
      })
      await this.setState({ isLoadingSkip: false })
      this.props.history.push('/dashboard')
    } catch (error) {
      toast.error(error.response.data.errMessage, {
        position: toast.POSITION.TOP_CENTER
      })
      console.log('ERROR', error)
    }
  }
  render() {
    const {
      data,
      data: { buyer }
    } = this.props
    const {
      isLoading,
      isLoadingReject,
      isLoadingSkip,
      addFinancier,
      isVerified,
      financerAddedSuccess,
      addFinancerData
    } = this.state
    /* const columns = [
      {
        Header: <StyledHead>Sr. No.</StyledHead>,
        accessor: 'srNo',
        maxWidth: 100
      },
      {
        Header: <StyledHead>Location</StyledHead>,
        accessor: 'location',
        minWidth: 100,
        Cell: props => <span>{props.value}</span>
      },
      {
        Header: <StyledHead>Usage Category</StyledHead>,
        accessor: 'usageCategory',
        minwidth: 120
      },
      {
        Header: <StyledHead>Property Details</StyledHead>,
        accessor: 'propertyDetails',
        minwidth: 180
      }
    ]
    const partyDetailscolumns = [
      {
        Header: <StyledHead>Sr. No.</StyledHead>,
        accessor: 'srNo',
        maxWidth: 100
      },
      {
        Header: <StyledHead>Party Name</StyledHead>,
        accessor: 'partyName',
        maxWidth: 150,
        Cell: props => <span>{props.value}</span>
      },
      {
        Header: <StyledHead>Party Type</StyledHead>,
        accessor: 'partyType',
        minwidth: 120
      },
      {
        Header: <StyledHead>Party Category</StyledHead>,
        accessor: 'partyCategory',
        minwidth: 180
      },
      {
        Header: <StyledHead>Action</StyledHead>,
        accessor: 'action',
        maxWidth: 150,
        Cell: props => <Button size="action" shadow={'none'} title="View" radius={'4px'} />
      }
    ] */
    return (
      <React.Fragment>
        <Formik
          enableReinitialize={true}
          initialValues={{
            selectPartyType: 'Admin',
            selectPartyCategory: 'Admin',
            isExecuter: 'Yes',
            email: get(buyer, 'userDetails.email', ''),
            salutation: get(buyer, 'userDetails.salutaion', 'Mr.'),
            partyFirstName: get(buyer, 'userDetails.firstName', ''),
            partyMiddleName: get(buyer, 'userDetails.middleName', ''),
            partyLastName: get(buyer, 'userDetails.lastName', ''),
            aliasName: get(buyer, 'userDetails.aliasName', ''),
            identificationMark1: get(buyer, 'userDetails.identityMark1', ''),
            identificationMark2: get(buyer, 'userDetails.identityMark2', ''),
            dateOfBirth: get(buyer, 'userDetails.dob', ''),
            age: get(buyer, 'userDetails.age', ''),
            uid: get(buyer, 'userDetails.uid', ''),
            identificationTypeID: get(buyer, 'userDetails.identityTypeID', ''),
            identificationDescription: get(buyer, 'userDetails.identityDesc', ''),
            panForm60: get(buyer, 'userDetails.pan', ''),
            occupation: get(buyer, 'userDetails.occupation', ''),
            gender: get(buyer, 'userDetails.gender', 'Male'),
            mobileNo: get(buyer, 'userDetails.mobileNo', ''),
            presentationExemption: get(buyer, 'userDetails.salutaion', ''),
            pinCode: get(buyer, 'userDetails.salutaion', ''),
            addressSame: 'Yes',
            district: get(buyer, 'userDetails.district', ''),
            taluka: get(buyer, 'userDetails.taluka', ''),
            village: get(buyer, 'userDetails.village', ''),
            financierName: get(buyer, 'userDetails.salutaion', ''),
            city: get(buyer, 'userDetails.salutaion', ''),
            branch: get(buyer, 'userDetails.salutaion', ''),
            totalValueOfProperty: get(buyer, 'userDetails.salutaion', ''),
            totalFinanceAmount: get(buyer, 'userDetails.salutaion', ''),
            financeAmountDueNow: get(buyer, 'userDetails.salutaion', ''),
            totalSaveAmount: get(buyer, 'userDetails.salutaion', ''),
            tokenAmount: get(buyer, 'userDetails.salutaion', ''),
            buyerFinancierName: get(buyer, 'userDetails.salutaion', ''),
            buyerCity: get(buyer, 'userDetails.salutaion', ''),
            buyerBranch: get(buyer, 'userDetails.salutaion', ''),
            buyerFinanceAmount: get(buyer, 'userDetails.salutaion', '')
          }}
          validate={buyerDetailValidation}
          validateOnChange
          onSubmit={async (values, { resetFrom }) => {
            const {
              match: { params }
            } = this.props
            if (
              Cookies.get('email') === get(buyer, 'userDetails.email', Cookies.get('email')) &&
              data.status === 'registry_buyer'
            ) {
              try {
                this.setState({ isLoading: true })
                await axios.post(`${API_URL}/confirmBuyer`, {
                  registryId: params.tab3,
                  propertyId: Cookies.get('propertyId'),
                  status: 'registry_buyer_confirmed'
                })
                await this.setState({ isLoading: false })
                await toast.success(`${'Confirmed buyer!'}`, {
                  position: toast.POSITION.TOP_CENTER
                })
                this.props.history.push('/dashboard')
                // console.log('DATA', data)
              } catch (error) {
                await this.setState({ isLoading: false })
                toast.error(error.response.data.errMessage, {
                  position: toast.POSITION.TOP_CENTER
                })
                console.log('ERROR', error)
              }
            } else if (
              Cookies.get('email') === get(buyer, 'userDetails.buyerFinancer.email', Cookies.get('email')) &&
              data.status === 'registry_buyer_financer'
            ) {
              try {
                this.setState({ isLoading: true })
                await axios.post(`${API_URL}/confirmFinancer`, {
                  registryId: params.tab3,
                  propertyId: Cookies.get('propertyId'),
                  currentStatus: 'registry_buyer_financer',
                  approved: true
                })
                await this.setState({ isLoading: false })
                await toast.success(`${'Financier confirmed!'}`, {
                  position: toast.POSITION.TOP_CENTER
                })
                this.props.history.push('/dashboard')
                // console.log('DATA', data)
              } catch (error) {
                await this.setState({ isLoading: false })
                toast.error(error.response.data.errMessage, {
                  position: toast.POSITION.TOP_CENTER
                })
                console.log('ERROR', error)
              }
            } else {
              try {
                this.setState({ isLoading: true })
                const { data } = await axios.post(`${API_URL}/addBuyer`, {
                  registryId: params.tab3,
                  propertyId: Cookies.get('propertyId'),
                  buyer: {
                    email: values.email,
                    partyType: values.selectPartyType,
                    partyCategory: values.selectPartyCategory,
                    isExecuter: values.isExecuter === 'Yes' ? true : false,
                    address: Cookies.get('address')
                  }
                })
                console.log('Add financier', data)
                await toast.success(`${'Buyer added!'}`, {
                  position: toast.POSITION.TOP_CENTER
                })
                await this.setState({ isLoading: false })
                this.props.history.push('/dashboard')
              } catch (error) {
                await this.setState({ isLoading: false })
                toast.error(error.response.data.errMessage, {
                  position: toast.POSITION.TOP_CENTER
                })
                console.log('ERROR', error)
              }
            }
          }}
          render={formikBag => (
            <React.Fragment>
              <FormikForm>
                <Paper
                  padding={'0 31px 20px'}
                  radius={'0 0 6px 6px'}
                  shadow={'0px 2px 6.5px 0.5px rgba(0, 0, 0, 0.06)'}
                  margin={'0 95px'}>
                  {/*<FormDetailsContainer paddingTop={'0'} display={'block'}>
                <InformTitle>List of Properties</InformTitle>
                <CustomTable
                  data={customData}
                  columns={columns}
                  resizable={false}
                  sortable={false}
                  showPagination={false}
                  pageSize={10}
                  defaultPageSize={10}
                  minRows={0}
                />
                </FormDetailsContainer>
              */}
                  <FormDetailsContainer flexBasis={'calc(50% - 10px)'}>
                    <div>
                      <PaddingBlank />
                      <Field
                        name="selectPartyType"
                        render={({ field }) => (
                          <SelectBox
                            label="Select Party Type"
                            onChange={selectPartyType =>
                              formikBag.setFieldValue('selectPartyType', selectPartyType.value)
                            }
                            options={[
                              { label: 'Individual', value: 'Individual' },
                              { label: 'Corporate', value: 'Corporate' }
                            ]}
                            placeholder="Select Party Type"
                            defaultValue={{ label: 'Individual', value: 'Individual' }}
                            isSearchable={false}
                          />
                        )}
                      />

                      {/* <Field
                        name="selectPartyCategory"
                        render={({ field }) => (
                          <SelectBox
                            label="Select Party Category"
                            onChange={selectPartyCategory =>
                              formikBag.setFieldValue('selectPartyCategory', selectPartyCategory.value)
                            }
                            options={[{ label: 'Admin', value: 'Admin' }, { label: 'User', value: 'User' }]}
                            placeholder="Select Party Type"
                            defaultValue={{ label: 'Admin', value: 'Admin' }}
                            isSearchable={false}
                          />
                        )}
                      /> */}
                    </div>
                    <div>
                      {/*  <Field
                        name="isExecuter"
                        render={({ field }) => (
                          <SelectBox
                            label="Is Executer?"
                            onChange={isExecuter => formikBag.setFieldValue('isExecuter', isExecuter.value)}
                            options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }]}
                            placeholder="Select Party Type"
                            defaultValue={{ label: 'Yes', value: 'Yes' }}
                            isSearchable={false}
                          />
                        )}
                      /> */}
                      <Field
                        name="email"
                        render={({ field }) => (
                          <TextInput
                            {...field}
                            label="Email address"
                            placeholder={'Email address'}
                            marginTop={'20px'}
                            error={formikBag.errors.email}
                          />
                        )}
                      />
                    </div>
                  </FormDetailsContainer>
                  {get(this.props, 'data', {}).hasOwnProperty('buyer') && (
                    <FormDetailsContainer>
                      <InformTitle>Parties Details</InformTitle>
                      <FieldGroupWithTitle>
                        <Field
                          name="salutation"
                          render={({ field }) => <TextInput {...field} label="Salutation" placeholder={'Salutation'} />}
                        />
                        <Field
                          name="partyFirstName"
                          render={({ field }) => (
                            <TextInput {...field} label="Party First Name" placeholder={'Party First Name'} />
                          )}
                        />
                        <Field
                          name="partyMiddleName"
                          render={({ field }) => (
                            <TextInput {...field} label="Party Middle Name" placeholder={'Party Middle Name'} />
                          )}
                        />
                        <Field
                          name="partyLastName"
                          render={({ field }) => (
                            <TextInput {...field} label="Party Last Name" placeholder={'Party Last Name'} />
                          )}
                        />
                        <Field
                          name="aliasName"
                          render={({ field }) => <TextInput {...field} label="Alias Name" placeholder={'Alias Name'} />}
                        />
                        <Field
                          name="identificationMark1"
                          render={({ field }) => (
                            <TextInput {...field} label="Identification Mark 1" placeholder={'Identification Mark 1'} />
                          )}
                        />
                        <Field
                          name="identificationMark2"
                          render={({ field }) => (
                            <TextInput {...field} label="Identification Mark 2" placeholder={'Identification Mark 2'} />
                          )}
                        />
                        <Field
                          name="dateOfBirth"
                          render={({ field }) => (
                            <TextInput {...field} label="Date of Birth" placeholder={'Date of Birth'} />
                          )}
                        />
                        <Field
                          name="age"
                          render={({ field }) => <TextInput {...field} label="Age" placeholder={'Age'} />}
                        />
                        <Field
                          name="uid"
                          render={({ field }) => <TextInput {...field} label="UID" placeholder={'UID'} />}
                        />
                        <Field
                          name="identificationTypeID"
                          render={({ field }) => (
                            <TextInput
                              {...field}
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
                              label="Identification Description"
                              placeholder={'Identification Description'}
                            />
                          )}
                        />

                        <Field
                          name="panForm60"
                          render={({ field }) => (
                            <TextInput {...field} label="PAN/Form 60/61" placeholder={'PAN/Form 60/61'} />
                          )}
                        />

                        <Field
                          name="occupation"
                          render={({ field }) => <TextInput {...field} label="Occupation" placeholder={'Occupation'} />}
                        />
                        <Field
                          name="gender"
                          render={({ field }) => <TextInput {...field} label="Gender" placeholder={'Gender'} />}
                        />
                        <Field
                          name="email"
                          render={({ field }) => (
                            <TextInput
                              {...field}
                              label="E-mail"
                              placeholder={'E-mail'}
                              error={formikBag.errors.email}
                            />
                          )}
                        />
                        <Field
                          name="mobileNo"
                          render={({ field }) => <TextInput {...field} label="Mobile No." placeholder={'Mobile No.'} />}
                        />
                        <Field
                          name="presentationExemption"
                          render={({ field }) => (
                            <TextInput
                              {...field}
                              label="Presentation Exemption"
                              placeholder={'Presentation Exemption'}
                            />
                          )}
                        />
                        <Field
                          name="pinCode"
                          render={({ field }) => <TextInput {...field} label="PIN Code" placeholder={'PIN Code'} />}
                        />
                        <Field
                          name="addressSame"
                          render={({ field }) => (
                            <TextInput {...field} label="Address Same As Above" placeholder={'Address Same As Above'} />
                          )}
                        />
                        <Field
                          name="district"
                          render={({ field }) => <TextInput {...field} label="District" placeholder={'District'} />}
                        />
                        <Field
                          name="taluka"
                          render={({ field }) => <TextInput {...field} label="Taluka" placeholder={'Taluka'} />}
                        />
                        <Field
                          name="village"
                          render={({ field }) => <TextInput {...field} label="Village" placeholder={'Village'} />}
                        />
                      </FieldGroupWithTitle>
                    </FormDetailsContainer>
                  )}
                </Paper>

                {get(this.props, 'data', {}).hasOwnProperty('buyerFinancer') && (
                  <Paper
                    padding={'26px 31px 20px'}
                    radius={'0 0 6px 6px'}
                    shadow={'0px 2px 6.5px 0.5px rgba(0, 0, 0, 0.06)'}
                    margin={'0px 95px 0px'}>
                    <HalfWraper>
                      <FlexWrapper flexDirection="column">
                        <InformTitle>Buyer Finance detail</InformTitle>
                        <React.Fragment>
                          <Field
                            name="name"
                            render={({ field }) => (
                              <TextInput
                                {...field}
                                label="Bank name"
                                value={get(data, 'buyerFinancer.userDetails.name', '')}
                                disabled
                                placeholder={get(data, 'buyerFinancer.userDetails.name', '')}
                              />
                            )}
                          />
                          <StyledFlex justify="flex-start">
                            <Field
                              name="city"
                              render={({ field }) => (
                                <TextInput
                                  {...field}
                                  label="City"
                                  value={get(data, 'buyerFinancer.userDetails.city', '')}
                                  disabled
                                  placeholder={'City'}
                                />
                              )}
                            />
                            <Field
                              name="branch"
                              render={({ field }) => (
                                <TextInput
                                  {...field}
                                  label="Branch"
                                  value={get(data, 'buyerFinancer.userDetails.branch', '')}
                                  disabled
                                  placeholder={'Branch'}
                                />
                              )}
                            />
                          </StyledFlex>
                          <FlexWrapper flexDirection="column">
                            <InformTitle>Finance Amount</InformTitle>
                            <Field
                              name="financeAmount"
                              render={({ field }) => (
                                <TextInput
                                  {...field}
                                  label="Finance Amount"
                                  value={get(data, 'buyerFinancer.financeAmount', '')}
                                  placeholder={'Finance Amount'}
                                  error={formikBag.errors.amount}
                                />
                              )}
                            />
                          </FlexWrapper>
                          {/* inputs form add */}

                          {/*end inputs ads */}
                        </React.Fragment>
                      </FlexWrapper>
                    </HalfWraper>
                  </Paper>
                )}
                <ButtonGroup>
                  {financerAddedSuccess ? null : data.status === 'registry_buyer_confirmed' &&
                  Cookies.get('email') === get(buyer, 'email', '') &&
                  data.status !== true ? (
                    <React.Fragment>
                      <Button
                        size={'medium'}
                        width={'150px'}
                        title="Add Financer"
                        type="button"
                        onClick={() => this.setState({ addFinancier: !addFinancier })}
                      />
                      <Button
                        size={'medium'}
                        width={'150px'}
                        title="Skip Financer"
                        type="button"
                        isLoading={isLoadingSkip}
                        disabled={isLoadingSkip}
                        onClick={() => this.skipFinancier()}
                      />
                    </React.Fragment>
                  ) : Cookies.get('email') === get(buyer, 'email', '') && data.status === 'registry_buyer' ? (
                    <React.Fragment>
                      <Button
                        size={'medium'}
                        width={'150px'}
                        isLoading={isLoadingReject}
                        title="reject"
                        type="button"
                        disabled={isLoadingReject}
                        onClick={() => this.rejectBuyer()}
                      />
                      <Button
                        size={'medium'}
                        width={'150px'}
                        isLoading={isLoading}
                        disabled={isLoading}
                        title="Confirm"
                        type="submit"
                      />
                    </React.Fragment>
                  ) : Cookies.get('email') === get(buyer, 'userDetails.buyerFinancer.email', Cookies.get('email')) &&
                  data.status === 'registry_buyer_financer' &&
                  Cookies.get('role') === 'bank' ? (
                    <React.Fragment>
                      <Button
                        size={'large'}
                        width={'150px'}
                        isLoading={isLoadingReject}
                        title="Reject Finance Details"
                        type="button"
                        disabled={isLoadingReject}
                        onClick={() => this.rejectBuyerFinancer()}
                      />
                      <Button
                        size={'large'}
                        width={'150px'}
                        isLoading={isLoading}
                        disabled={isLoading}
                        title="Confirm Finance Details"
                        type="submit"
                      />
                    </React.Fragment>
                  ) : Cookies.get('email') === get(data.owner, 'email', '') &&
                  (data.status === 'registry_skip_owner_financer' ||
                    data.status === 'registry_owner_financer_verified') ? (
                    <Button
                      size={'medium'}
                      width={'150px'}
                      title="Add Buyer"
                      isLoading={isLoading}
                      disabled={isLoading}
                    />
                  ) : null}
                </ButtonGroup>
              </FormikForm>
            </React.Fragment>
          )}
        />
        {/* {addFinancier && (
          <React.Fragment>
            <Formik
              enableReinitialize
              initialValues={{
                email: '',
                city: 'Pune',
                branch: 'Pune',
                totalValueOfProperty: '1000000',
                totalFinanceAmount: '10000',
                financeAmountDueNow: '1000000',
                loanAmount: '1000000',
                outstandingLoan: '100000',
                financeAmount: '1000000'
              }}
              onSubmit={async values => {
                const {
                  match: { params }
                } = this.props

                try {
                  this.setState({ isLoading: true })
                  const { data } = await axios.post(`${API_URL}/addBuyerFinancer`, {
                    registryId: params.tab3,
                    propertyId: Cookies.get('propertyId'),
                    buyerFinancer: {
                      email: values.email,
                      financeAmount: values.financeAmount,
                      address: Cookies.get('address')
                    },
                    status: 'registry_buyer_financer'
                  })
                  console.log('Add financier', data)
                  await toast.success(`${'Buyer financier added!'}`, {
                    position: toast.POSITION.TOP_CENTER
                  })
                  await this.setState({ isLoading: false })
                  this.props.history.push('/dashboard')
                } catch (error) {
                  await this.setState({ isLoading: false })
                  toast.error(`${'Some error occurred!'}`, {
                    position: toast.POSITION.TOP_CENTER
                  })
                  console.log('ERROR', error)
                }
              }}
              render={formikBag => (
                <React.Fragment>
                  <FormikForm>
                    <Paper
                      padding={'0 31px 20px'}
                      radius={'0 0 6px 6px'}
                      shadow={'0px 2px 6.5px 0.5px rgba(0, 0, 0, 0.06)'}
                      margin={'0 95px'}>
                      <FormDetailsContainer>
                        <InformTitle>Financier Details</InformTitle>
                        <FieldGroupWithTitle>
                          <Field
                            name="email"
                            render={({ field }) => (
                              <TextInput {...field} label="Email Address" placeholder={'Email Address'} required />
                            )}
                          />

                         <Field
                    name="city"
                    render={({ field }) => <TextInput {...field} label="City" placeholder={'City'} />}
                  />

                  <Field
                    name="branch"
                    render={({ field }) => <TextInput {...field} label="Branch" placeholder={'Branch'} />}
                  />

                  <Field
                    name="totalValueOfProperty"
                    render={({ field }) => (
                      <TextInput {...field} label="Total Value of Property" placeholder={'Total Value of Property'} />
                    )}
                  />

                  <Field
                    name="totalFinanceAmount"
                    render={({ field }) => (
                      <TextInput {...field} label="Total finance amount" placeholder={'Total finance amount'} />
                    )}
                  />

                  <Field
                    name="financeAmountDueNow"
                    render={({ field }) => (
                      <TextInput {...field} label="Finance amount due now" placeholder={'Finance amount due now'} />
                    )}
                  /> 
                        </FieldGroupWithTitle>
                      </FormDetailsContainer>
                      <FormDetailsContainer>
                        <InformTitle>Finance Amount</InformTitle>
                        <NormalFieldsTuple shrink>
                           <Field
                            name="loanAmount"
                            render={({ field }) => (
                              <TextInput {...field} label="Loan amount" placeholder={'Loan amount'} />
                            )}
                          /> 
                          <Field
                            name="financeAmount"
                            render={({ field }) => (
                              <TextInput
                                {...field}
                                label="Finance Amount"
                                placeholder={'Finance Amount'}
                                error={formikBag.errors.amount}
                              />
                            )}
                          />
                        </NormalFieldsTuple>
                      </FormDetailsContainer>
                    </Paper>
                    <ButtonGroup>
                      <Button
                        size={'medium'}
                        isLoading={isLoading}
                        disabled={isLoading}
                        width={'150px'}
                        title="Submit"
                        type="submit"
                      />
                    </ButtonGroup>
                  </FormikForm>
                </React.Fragment>
              )}
            />
          </React.Fragment>
        )}
      */}
        {addFinancier && (
          <React.Fragment>
            <Modal show={addFinancier}>
              <CloseWrap>
                <PaperTitle color="#fff">Financer Details</PaperTitle>
                <Close onClick={() => this.setState({ addFinancier: !addFinancier })} />
              </CloseWrap>
              <ModalData>
                <Formik
                  enableReinitialize
                  initialValues={{
                    name: get(addFinancerData, 'name', ''),
                    email: '',
                    financeAmount: '0',
                    city: get(addFinancerData, 'city', ''),
                    branch: get(addFinancerData, 'branch', '')
                  }}
                  validate={buyerDetail}
                  validateOnChange
                  onSubmit={async values => {
                    const {
                      match: { params }
                    } = this.props
                    if (isVerified) {
                      try {
                        this.setState({ isLoading: true })
                        const { data } = await axios.post(`${API_URL}/addBuyerFinancer`, {
                          registryId: params.tab3,
                          propertyId: Cookies.get('propertyId'),
                          buyerFinancer: {
                            email: values.email,
                            financeAmount: values.financeAmount,
                            address: this.state.financerAddress
                          },
                          status: 'registry_buyer_financer'
                        })
                        console.log('Add financier', data)
                        await toast.success(`${'Buyer financier added!'}`, {
                          position: toast.POSITION.TOP_CENTER
                        })
                        await this.setState({
                          isLoading: false,
                          addFinancier: false,
                          financerAddedSuccess: true
                        })
                      } catch (error) {
                        await this.setState({ isLoading: false })
                        toast.error(error.response.data.errMessage, {
                          position: toast.POSITION.TOP_CENTER
                        })
                        console.log('ERROR', error)
                      }
                    } else {
                      try {
                        this.setState({ isLoading: true })
                        const { data } = await axios.get(`${API_URL}/getUserDetails?email=${values.email}`)
                        await this.setState({ financerAddress: data.data.address })
                        await toast.success(`${'Email is verified!'}`, {
                          position: toast.POSITION.TOP_CENTER
                        })
                        await this.setState({
                          isLoading: false,
                          addFinancerData: data.data,
                          isVerified: get(data.data, 'role', '') === 'bank' ? true : false
                        })
                      } catch (error) {
                        await this.setState({ isLoading: false })
                        toast.error(error.response.data.errMessage, {
                          position: toast.POSITION.TOP_CENTER
                        })
                        console.log('ERROR', error)
                      }
                    }
                  }}
                  render={formikBag => (
                    <FormikForm marginBottom="0px">
                      <Field
                        name="email"
                        render={({ field }) => (
                          <TextInput
                            {...field}
                            label="Email Address"
                            placeholder={'Email Address'}
                            error={formikBag.errors.email}
                          />
                        )}
                      />
                      {isVerified && (
                        <React.Fragment>
                          <Field
                            name="name"
                            render={({ field }) => (
                              <TextInput {...field} label="Bank name" disabled placeholder={'Bank Name'} />
                            )}
                          />
                          <StyledFlex justify="flex-start">
                            <Field
                              name="city"
                              render={({ field }) => (
                                <TextInput {...field} label="City" disabled placeholder={'City'} />
                              )}
                            />
                            <Field
                              name="branch"
                              render={({ field }) => (
                                <TextInput {...field} label="Branch" disabled placeholder={'Branch'} />
                              )}
                            />
                          </StyledFlex>
                          <FlexWrapper flexDirection="column">
                            <InformTitle>Finance Amount</InformTitle>
                            <Field
                              name="financeAmount"
                              render={({ field }) => (
                                <TextInput
                                  {...field}
                                  label="Finance Amount"
                                  placeholder={'Finance Amount'}
                                  error={formikBag.errors.amount}
                                />
                              )}
                            />
                          </FlexWrapper>
                        </React.Fragment>
                      )}
                      <FlexWrapper justifyContent="center">
                        <Button size={'medium'} width={'150px'} title="Submit" type="submit" isLoading={isLoading} />
                      </FlexWrapper>
                    </FormikForm>
                  )}
                />
              </ModalData>
            </Modal>
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }
}
export default withRouter(BuyerDetailsForm)
