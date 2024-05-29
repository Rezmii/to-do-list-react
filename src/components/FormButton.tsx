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
} from "@chakra-ui/react";
import { FormEvent, useRef, useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import EmojiPickerModal from "./EmojiPickerModal";

interface Props {
  onSubmit: (title: string, emoji: string) => void;
}

const FormButton = ({ onSubmit }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const titleRef = useRef<HTMLInputElement>(null);
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    let title = titleRef.current?.value ?? "";
    let emoji = selectedEmoji ?? "";
    onSubmit(title, emoji);
    onClose();
  };

  return (
    <>
      <CiSquarePlus size={60} onClick={onOpen} />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a new set</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <Input ref={titleRef} placeholder="add title" marginBottom={5} />
              <EmojiPickerModal
                onEmojiClick={(emoji) => setSelectedEmoji(emoji)}
                emoji={selectedEmoji}
              />
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
