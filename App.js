import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

export default function App() {
  //Definir datos del formulario que se validara
  const {control,handleSubmit, formState: {errors}} = useForm({
    defaultValues:{
      fullname:'',
      email:'',
      password:'',
      salary:''
    }
  })
  //Definir el metodo para mostar los datos cuando sean validos
  const onSubmit = data => console.log(data)
  return (
    <View style={styles.container}>
      <Controller
        control={control}
        rules={{
          required:true,
          pattern:/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g,
          maxLength:30,
          minLength:3,
        }}
        render={({field: { onChange, onBlur, value }} ) => (
          <TextInput style={[styles.inputs,{borderBottomColor: errors.fullname?.type == "required" ||  "pattern" || "maxLength" || "minLength" ? 'red' : 'green'}]}
          placeholder="Nombre completo"
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          />
        )}
        name="fullname"
      />
      {errors.fullname?.type == "required" && <Text style={{color:'red'}}> El nombre es obligatorio</Text>}
      {errors.fullname?.type == "maxLength" && <Text style={{color:'red'}}> El nombre no puede exceder de 30 chars</Text>}
      {errors.fullname?.type == "minLength" && <Text style={{color:'red'}}> El nombre debe tener minimo 3 chars</Text>}
      {errors.fullname?.type == "pattern" && <Text style={{color:'red'}}> El nombre solo puede tener letras y/o espacios</Text>}

     {/*  {// Input de Email} */}
      <Controller
        control={control}
        rules={{
          required:true,
          pattern:/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i
         
        }}
        render={({field: { onChange, onBlur, value }} ) => (
          <TextInput style={[styles.inputs,{borderBottomColor: errors.email?.type == "required" || errors.email?.type == "pattern" ? 'red' : 'green'}]}
          placeholder="Correo Electronico"
          onChange={onChange} 
          onBlur={onBlur}
          value={value}
          />
        )}
        name="email"
      />
      {errors.email?.type == "required" && <Text style={{color:'red'}}> El email es obligatorio</Text>}
      {errors.email?.type == "pattern" && <Text style={{color:'red'}}> El correo no es valido</Text>}

      {/*  {// Input de Password} */}
        <Controller
        control={control}
        rules={{
          required:true,
          pattern:/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/
        }}
        render={({field: { onChange, onBlur, value }} ) => (
          <TextInput style={[styles.inputs,{borderBottomColor: errors.password?.type == "required" || errors.password?.type == "pattern" ? 'red' : 'green'}]}
          placeholder="Password"
          onChange={onChange} 
          onBlur={onBlur}
          value={value}
          secureTextEntry={true}
          />
        )}
        name="password"
      />
      {errors.password?.type == "required" && <Text style={{color:'red'}}> El password es obligatorio</Text>}
      {errors.password?.type == "pattern" && <Text style={{color:'red'}}> El password debe contener letras, mayusculas, numeros, caracter especial</Text>}

      {/*  {// Input de Salary} */}
        <Controller
        control={control}
        rules={{
          required:true,
          pattern:/^(?!0+\.00)(?=.{1,9}(\.|$))(?!0(?!\.))\d{1,8}(,\d{3})*(\.\d+)?$/
        }}
        render={({field: { onChange, onBlur, value }} ) => (
          <TextInput style={[styles.inputs,{borderBottomColor: errors.salary?.type == "required" || errors.salary?.type == "pattern" ? 'red' : 'green'}]}
          placeholder="Salario"
          onChange={onChange} 
          onBlur={onBlur}
          value={value}
          />
        )}
        name="salary"
      />
      {errors.salary?.type == "required" && <Text style={{color:'red'}}> El Salario es obligatorio</Text>}
      {errors.salary?.type == "pattern" && <Text style={{color:'red'}}> Debe de ingresar solo numeros</Text>}
      <TouchableOpacity
        style={{backgroundColor:'green', borderRadius:10, padding:5, width:200}}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={{color:'white', textAlign:'center'}}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputs:{
    padding:10,
    borderRadius:10,
    color:'black',
    marginBottom:5,
    borderWidth:1,
    borderColor:'green'
  }
});
