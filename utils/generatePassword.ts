import { generate } from 'generate-password'

export default generate(
    {
     length:10,
     uppercase:false,
     numbers:true
    }
)