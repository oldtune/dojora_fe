import React, { Fragment, useEffect, useState } from "react";
import "./JournalEdit.less";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePen } from "@fortawesome/free-solid-svg-icons";

export type JournalEditProps = {
  readonly: boolean;
  content: string;
  onSave: (content: string) => any;
};

export const JournalEdit: React.FC<JournalEditProps> = (props) => {
  const [content, setContent] = useState("");
  const saveButton = props.readonly ? (
    ""
  ) : (
    <div>
      <FontAwesomeIcon
        title="Save"
        onClick={() => props.onSave(content)}
        icon={faSquarePen}
        className="pen pen__grey"
      />
    </div>
  );

  useEffect(() => {
    if (props.content) {
      setContent(props.content);
    }
  }, []);

  return (
    <div className="journal-editor-wrapper">
      <div id="journal-editor">
        <textarea
          onChange={(event) => setContent(event?.target.value)}
          disabled={props.readonly}
          value={content}
          id="write_journal_input"
          spellCheck={false}
        />
      </div>
      <div className="journal-editor-toolbar">{saveButton}</div>
    </div>
  );
};
