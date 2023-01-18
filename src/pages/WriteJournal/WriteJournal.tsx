import React, { useEffect, useRef, useState } from "react";
import "./WriteJournal.less";
import { JournalService } from "../../Components/Journal/Journal.service";
import { Message } from "../../Shared/Misc/Message";
import { useParams } from "react-router-dom";
import { Journal } from "../../Components/Journal/Journal";
import { JournalEdit } from "../../Components/Journal/JournalEdit/JournalEdit";
import { CollapsibleSideBar } from "../../Shared/Components/Collapsible_SideBar/CollapsibleSideBar";
import { Layout } from "antd";

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
      setReadonly(true);
      return;
    }

    Message.error("Failed to save!");
  };

  const childInputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (childInputRef.current) {
      childInputRef.current.focus();
    }
  });

  return (
    <Layout>
      <div className="journal-page">
        <JournalEdit
          childInputRef={childInputRef}
          content=""
          onSave={onSave}
          readonly={isReadonly}
        />
        <CollapsibleSideBar
          border={true}
          content={
            <span>
              <b>Index</b>
            </span>
          }
        />
      </div>
    </Layout>
  );
};
