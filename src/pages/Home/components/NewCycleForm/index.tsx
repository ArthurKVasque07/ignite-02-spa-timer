import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import zod from 'zod';
import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";

const newCycleValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(5).max(60, 'Ciclo máximo de 60min.'),
})

// interface NewCycleFormData {
//   task: string;
//   minutesAmount: number;
// }

type NewCycleFormData = zod.infer<typeof newCycleValidationSchema>

export function NewCycleForm() {
  const { register, handleSubmit, watch, formState, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  });
  console.log(formState.errors);
  return(
    <FormContainer>        
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput 
        id="task"
        list="task-suggestions"
        placeholder="Dê um nome para o seu projeto"
        disabled={!!activeCycle}
        {...register('task')}
      />
      <datalist id="task-suggestions">
        <option value="Projeto 1" />
      </datalist>

      <label htmlFor="">durante</label>
      <MinutesAmountInput 
        type="number" 
        id="minutesAmount" 
        placeholder="00" 
        step={5} 
        min={5} 
        max={60} 
        {...register('minutesAmount', { valueAsNumber: true })}
      />

      <span>minutos.</span>    
    </FormContainer>
  )
}