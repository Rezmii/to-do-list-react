import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Input,
  Text,
  VStack,
  Textarea,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa6";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

const schema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  description: z
    .string()
    .min(5, { message: "Description must be at least 5 characters." })
    .max(50, { message: "Description must be at max 50 characters." }),
  deadline: z.string().refine(
    (dateString) => {
      const selectedDate = new Date(dateString);
      const currentDate = new Date();
      return selectedDate >= currentDate;
    },
    { message: "Deadline must be in the future." }
  ),
});

type FormData = z.infer<typeof schema>;

const capitalizeFirstLetter = (string: String) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

interface Props {
  onSubmit: (
    id: number,
    title: string,
    description: string,
    deadline: Date
  ) => void;
}

const TasksFormButton = ({ onSubmit }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { id } = useParams<{ id: string | undefined }>();
  const setId = id ? parseInt(id) : undefined;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmitForm = (data: FieldValues) => {
    let title = capitalizeFirstLetter(data.title);
    let description = capitalizeFirstLetter(data.description);
    let deadline = new Date(data.deadline);

    if (setId !== undefined) {
      onSubmit(setId, title, description, deadline);
      reset();
      onClose();
    }
  };

  return (
    <>
      <VStack>
        <Button leftIcon={<FaPlus size={17} />} onClick={onOpen}>
          Add a new task
        </Button>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a new task</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <ModalBody>
              <Input
                {...register("title")}
                placeholder="add title"
                type="text"
                marginBottom={3}
              />
              {errors.title && <Text color="red">{errors.title.message}</Text>}

              <Textarea
                {...register("description")}
                placeholder="add description"
                marginBottom={3}
              />
              {errors.description && (
                <Text color="red">{errors.description.message}</Text>
              )}
              <Input {...register("deadline")} type="date" />
              {errors.deadline && (
                <Text color="red">{errors.deadline.message}</Text>
              )}
            </ModalBody>

            <ModalFooter>
              <Button mr={3} onClick={onClose}>
                Close
              </Button>
              <Button type="submit">Add</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TasksFormButton;
