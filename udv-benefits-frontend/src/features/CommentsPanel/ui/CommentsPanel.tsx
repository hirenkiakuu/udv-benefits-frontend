import Input from "shared/ui/Input/Input";
import cls from "./CommentsPanel.module.scss";
import { classNames } from "shared/lib/classNames/classNames";
import { Heading } from "shared/ui";
import api from "shared/api/api";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import SendIcon from "shared/assets/icons/send.svg";
import FileIcon from "shared/assets/icons/file.svg";
import FilePreviewIcon from "shared/assets/icons/file-preview.png";
import { formatToHours } from "shared/lib/formatters/formatDate";

type Comment = {
  message: string;
  id: number;
  isRead: boolean;
  createdAt: string;
  attachmentId: number;
  sender: {
    id: number;
    profilePhoto: string;
    firstName: string;
    lastName: string;
    middleName: string;
  };
  attachment: {
    filename: string;
    fileUrl: string;
    id: number;
  };
};

interface CommentProps {
  comment: Comment;
}

const Comment = ({ comment }: CommentProps) => {
  const { message, createdAt } = comment;
  const { firstName, middleName, lastName, profilePhoto } = comment.sender;

  return (
    <div className={cls.commentContainer}>
      <img src={profilePhoto} className={cls.userAvatar} alt="" />
      <div className={cls.commentContent}>
        <div className={cls.commentHeader}>
          <p className={cls.commentSender}>
            <b>
              {lastName} {firstName} {middleName}
            </b>
          </p>
          <p>{formatToHours(createdAt)}</p>
        </div>
        <p>{message}</p>
        {comment.attachment && (
          <div className={cls.fileAttachment}>
            <img src={FilePreviewIcon} alt="" />
            <a
              className={cls.fileName}
              target="_blank"
              href={comment.attachment.fileUrl}
              rel="noopener noreferrer"
            >
              {comment.attachment.filename}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

interface CommentsPanelProps {
  comments: Comment[];
  className?: string;
}

const CommentsPanel = ({ comments, className }: CommentsPanelProps) => {
  const { id } = useParams();
  const [commentsList, setCommentsList] = useState<Comment[]>(comments || []);
  const [commentText, setCommentText] = useState("");
  const [file, setFile] = useState<File | null>(null); // Состояние для файла
  const commentsEndRef = useRef<HTMLDivElement>(null);

  // Прокрутка вниз при добавлении комментария
  useEffect(() => {
    commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [commentsList]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(event.target.value);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    setFile(selectedFile);
  };

  const handleCommentSubmit = async () => {
    const formData = new FormData();
    formData.append("message", commentText);
    if (file) formData.append("attachment", file);

    try {
      const res = await api.post(`/api/orders/${id}/comments`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res) {
        console.log(res.data);
        setCommentsList((prevComments) => [res.data, ...prevComments]); // Добавляем новый комментарий в начало списка
        setCommentText(""); // Очищаем поле ввода
        setFile(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={classNames(cls.commentsPanel, {}, [className])}>
      <div className={cls.commentsPanelHeader}>
        <Heading size="medium">Комментарии</Heading>
        <div className={cls.divider}></div>
      </div>

      <div className={cls.commentsContainer}>
        {commentsList
          .slice() // Создаем копию массива, чтобы не мутировать оригинальный
          .reverse() // Сортируем: старые сверху
          .map((comment, index) => (
            <Comment key={index} comment={comment} />
          ))}
        <div ref={commentsEndRef}></div> {/* Элемент для прокрутки */}
      </div>

      <div className={cls.commentsPanelAction}>
        {file && <p>{file.name}</p>}
        <div className={cls.actionButtons}>
          <Input
            className={cls.commentInput}
            placeholder="Напишите комментарий"
            value={commentText}
            onChange={handleInputChange}
          />

          <label htmlFor="fileInput" className={cls.fileUploadButton}>
            <FileIcon width="13px" height="16px" />
          </label>
          <input
            id="fileInput"
            type="file"
            className={cls.fileInput}
            onChange={handleFileChange}
          />

          <button
            className={cls.sendCommentButton}
            onClick={handleCommentSubmit}
          >
            <SendIcon width="16px" height="16px" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentsPanel;
