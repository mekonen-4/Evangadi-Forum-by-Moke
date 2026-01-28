import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { MdAccountCircle, MdEdit, MdDelete } from "react-icons/md";
import { UserState } from "../../App.jsx";
import { questionService } from "../../Api/question.service.js";
import Swal from "sweetalert2";
import styles from "./questionCard.module.css";

function QuestionCard({
  id,
  userName,
  questionTitle,
  description,
  question_date,
  ownerId,
  onActionSuccess, // Used for delete
  onUpdateSuccess, // Used for update
}) {
  const { user } = useContext(UserState);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(questionTitle);
  const [editDesc, setEditDesc] = useState(description);

  const loggedInId = user?.id || user?.userid;
  const isOwner =
    loggedInId && ownerId && String(loggedInId) === String(ownerId);

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This question will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#fe8402",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await questionService.deleteQuestion(id);
        onActionSuccess(id);
        Swal.fire("Deleted!", "Question removed.", "success");
      } catch (err) {
        Swal.fire("Error", "Could not delete.", "error");
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await questionService.updateQuestion(id, {
        title: editTitle,
        description: editDesc,
      });

      // Update the parent state so the UI changes instantly
      onUpdateSuccess({ id, title: editTitle, description: editDesc });

      setIsEditing(false); // Close the edit form

      Swal.fire({
        title: "Updated!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire("Error", "Update failed.", "error");
    }
  };

  return (
    <div className={styles.question_container}>
      {isEditing ? (
        <form onSubmit={handleUpdate} className={styles.edit_form}>
          <input
            className={styles.edit_input}
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            required
          />
          <textarea
            className={styles.edit_textarea}
            value={editDesc}
            onChange={(e) => setEditDesc(e.target.value)}
            required
          />
          <div className={styles.edit_btns}>
            <button type="submit" className={styles.save_btn}>
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className={styles.cancel_btn}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className={styles.question_content}>
          <div className={styles.header_flex}>
            <Link to={`/question/${id}`} className={styles.question_link}>
              <h3 className={styles.question_title}>{questionTitle}</h3>
            </Link>
            {isOwner && (
              <div className={styles.action_icons}>
                <MdEdit
                  className={styles.edit_icon}
                  size={20}
                  onClick={() => setIsEditing(true)}
                />
                <MdDelete
                  className={styles.delete_icon}
                  size={20}
                  onClick={handleDelete}
                />
              </div>
            )}
          </div>
          <p className={styles.question_excerpt}>{description}</p>
          <div className={styles.question_meta}>
            <div className={styles.user_info}>
              <MdAccountCircle size={18} />
              <span className={styles.user_name}>@{userName}</span>
            </div>
            <span className={styles.date_text}>
              asked {moment(question_date).fromNow()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuestionCard;
