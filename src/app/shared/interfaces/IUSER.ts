export interface IUSER {

  id: number,
  firstName: string,
  lastName: string,
  emailAddress: string,
  phoneNumber: string,
  otherPhoneNumbers: [
    {
      id: number,
      phoneNumber: string
    }
  ],
  otherEmailAddresses: [
    {
      id: number,
      emailAddress: string
    }
  ]


}
