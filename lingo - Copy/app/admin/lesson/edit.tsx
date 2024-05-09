import {
  SimpleForm,
  Edit,
  TextInput,
  required,
  ReferenceInput,
} from 'react-admin'

export const LessonEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source='title' validate={[required()]} label='Title' />
        <ReferenceInput source='unitId' reference='units' />
        <TextInput source='order' validate={[required()]} label='Order' />
      </SimpleForm>
    </Edit>
  )
}
