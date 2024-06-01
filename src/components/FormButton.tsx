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
} from "@chakra-ui/react";
import { useState } from "react";
import EmojiPickerModal from "./EmojiPickerModal";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa6";

const schema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
});

type FormData = z.infer<typeof schema>;

const capitalizeFirstLetter = (string: String) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

interface Props {
  onSubmit: (title: string, emoji: string) => void;
}

const FormButton = ({ onSubmit }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const [emojiError, setEmojiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmitForm = (data: FieldValues) => {
    let title = capitalizeFirstLetter(data.title);
    let emoji = selectedEmoji ?? "";
    if (!selectedEmoji) {
      setEmojiError("Please select an emoji.");
      return;
    } else {
      setEmojiError(null);
    }
    onSubmit(title, emoji);
    reset();
    onClose();
  };

  return (
    <>
      <Button leftIcon={<FaPlus size={17} />} onClick={onOpen}>
        Add a new Set
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a new set</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <ModalBody>
              <Input
                {...register("title")}
                placeholder="add title"
                type="text"
              />
              {errors.title && <Text color="red">{errors.title.message}</Text>}
              <EmojiPickerModal
                onEmojiClick={(emoji) => setSelectedEmoji(emoji)}
                emoji={selectedEmoji}
              />
              {emojiError && <Text color="red">{emojiError}</Text>}
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

export default FormButton;
