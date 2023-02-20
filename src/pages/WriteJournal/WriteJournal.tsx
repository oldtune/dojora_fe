import React, { Fragment, useEffect, useRef, useState } from "react";
import "./WriteJournal.less";
import { JournalService } from "../../Components/Journal/Journal.service";
import { Message } from "../../Shared/Misc/Message";
import { Link, useParams } from "react-router-dom";
import { Journal, JournalBrief } from "../../Components/Journal/Journal";
import { JournalEdit } from "../../Components/Journal/JournalEdit/JournalEdit";
import { CollapsibleSideBar } from "../../Shared/Components/Collapsible_SideBar/CollapsibleSideBar";
import { Layout } from "antd";
import { UnixTimestampToDate } from "../../Shared/Misc/Time";

export const WriteJournal: React.FC = () => {
  const { journalId } = useParams();
  const [isReadonly, setReadonly] = useState(false);
  const [content, setContent] = useState("");
  const [sidebarContent, setSidebarContent] = useState<any>([]);

  const constructSidebarItem = (id: string, date: string) => {
    return (
      <Link
        className="sidebar_item__hover__red"
        key={id}
        to={`/journal/${id}`}
        style={{ display: "block" }}
      >
        {date}
      </Link>
    );
  };
  useEffect(() => {
    (async () => {
      const getBriefResult = await JournalService.getListJournalBrief();
      if (!getBriefResult.success) {
        Message.error("Failed to get sidebar");
        return;
      }

      const journalBriefs: JournalBrief[] =
        getBriefResult.data as JournalBrief[];

      const links = journalBriefs
        .map((item) => {
          return { ...item, date: UnixTimestampToDate(Number(item.date)) };
        })
        .map((brief) => constructSidebarItem(brief.id, brief.date));

      setSidebarContent(links);
    })();

    (async () => {
      if (journalId) {
        setReadonly(true);
        const getResult = await JournalService.getJournal(journalId);
        if (!getResult.success) {
          Message.error("Failed to load journal detail!");
          return;
        }
        setContent((getResult.data as Journal).content);
      }
    })();
  }, [journalId]);

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
          content={content}
          onSave={onSave}
          readonly={isReadonly}
        />
        <CollapsibleSideBar
          border={true}
          content={
            <Fragment>
              <b>Index</b>
              {sidebarContent}
            </Fragment>
          }
        />
      </div>
    </Layout>
  );
};
