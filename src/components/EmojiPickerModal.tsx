import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  Text,
  HStack,
} from "@chakra-ui/react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

interface Props {
  onEmojiClick: (emoji: string) => void;
  emoji: string | null;
}

const EmojiPickerModal = ({ onEmojiClick, emoji }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    onEmojiClick(emojiData.emoji);
    onClose();
  };

  return (
    <>
      <HStack>
        <Button marginTop={5} onClick={onOpen}>
          Add emoji
        </Button>
        <Text fontSize="2xl">{emoji ? emoji : ""}</Text>
      </HStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <EmojiPicker onEmojiClick={handleEmojiClick} width="100%" />
        </ModalContent>
      </Modal>
    </>
  );
};

export default EmojiPickerModal;
