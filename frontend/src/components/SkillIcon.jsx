import React, { useEffect, useState } from "react";
import { FiCode } from "react-icons/fi";
import { getSkillIcon, isValidSkillIconComponent, loadSkillIcon } from "../data/skillIcons";

const SkillIcon = ({ icon, showError = false }) => {
  const [Icon, setIcon] = useState(() => getSkillIcon(icon));
  const [error, setError] = useState("");
  const RenderIcon = isValidSkillIconComponent(Icon) ? Icon : FiCode;

  useEffect(() => {
    let active = true;
    setIcon(getSkillIcon(icon));
    setError("");
    loadSkillIcon(icon)
      .then((ResolvedIcon) => {
        if (active && isValidSkillIconComponent(ResolvedIcon)) setIcon(() => ResolvedIcon);
      })
      .catch((loadError) => {
        if (active) setError(loadError.message);
      });
    return () => { active = false; };
  }, [icon]);

  return (
    <>
      <RenderIcon aria-hidden="true" />
      {showError && error && <small className="admin-skill-icon-error" role="status">{error}</small>}
    </>
  );
};

export default SkillIcon;
