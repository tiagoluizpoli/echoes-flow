import { useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useOnboarding } from '../context';

export const ContactInfoForm = () => {
  const { form } = useOnboarding();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'contactInfo',
  });
  return (
    <div className="grid grid-cols-1 gap-4">
      <FormField
        control={form.control}
        name="contactInfo"
        render={() => {
          return (
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <FormLabel>Dados de contato</FormLabel>
                <Button
                  type="button"
                  variant="outline"
                  className="w-fit"
                  onClick={() =>
                    append({
                      type: 'phone',
                      value: '',
                    })
                  } // Append method from useFieldArray
                >
                  Adicionar Contato
                </Button>
              </div>
              {fields.map((field, index) => (
                <div key={field.id} className="flex flex-row gap-4 items-start">
                  <FormField
                    control={form.control}
                    name={`contactInfo.${index}.type`}
                    render={({ field }) => (
                      <FormItem className="flex-grow">
                        <FormLabel
                          className={index > 0 ? 'sr-only' : undefined}
                        >
                          Tipo
                        </FormLabel>

                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="min-w-36 w-full">
                              <SelectValue placeholder="Selecione o tipo" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="phone">Telefone</SelectItem>
                            <SelectItem value="email">Email</SelectItem>
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`contactInfo.${index}.value`} // Dynamic name path
                    render={({ field }) => (
                      <FormItem className="flex-grow-[2]">
                        <FormLabel
                          className={index > 0 ? 'sr-only' : undefined}
                        >
                          Valor
                        </FormLabel>
                        <FormControl>
                          <div className="flex gap-4">
                            <Input placeholder="Valor do Contato" {...field} />
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              onClick={() => {
                                if (fields.length > 1) {
                                  remove(index);
                                }
                              }} // Remove method from useFieldArray
                              className="shrink-0"
                            >
                              ❌
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
              <FormMessage />
            </div>
          );
        }}
      />
    </div>
  );
};
