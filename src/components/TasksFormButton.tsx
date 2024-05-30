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
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa6";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

const schema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
});

type FormData = z.infer<typeof schema>;

const capitalizeFirstLetter = (string: String) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

interface Props {
  onSubmit: (id: number, title: string) => void;
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

    if (setId !== undefined) {
      onSubmit(setId, title);
      reset();
      onClose();
    }
  };

  return (
    <>
      <VStack>
        <Button onClick={onOpen} fontSize={20}>
          <FaPlus />
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
              />
              {errors.title && <Text color="red">{errors.title.message}</Text>}
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost" type="submit">
                Add
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TasksFormButton;
