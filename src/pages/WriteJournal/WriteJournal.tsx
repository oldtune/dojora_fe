import React, { useEffect, useState } from "react";
import "./WriteJournal.less";
import { JournalService } from "../../Components/Journal/Journal.service";
import { Message } from "../../Shared/Misc/Message";
import { useParams } from "react-router-dom";
import { Journal } from "../../Components/Journal/Journal";
import { JournalEdit } from "../../Components/Journal/JournalEdit/JournalEdit";

export const WriteJournal: React.FC = () => {
  const { journalId } = useParams();
  const [isReadonly, setReadonly] = useState(false);

  useEffect(() => {
    if (journalId) {
      setReadonly(true);
    }
  }, []);

  const onSave = async (content: string) => {
    const journal: Journal = { content };
    const result = await JournalService.addNew(journal);
    if (result.success) {
      Message.success("Saved!");
      return;
    }

    Message.error("Failed to save!");
  };

  return <JournalEdit content="" onSave={onSave} readonly={isReadonly} />;
};
