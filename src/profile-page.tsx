import React, { FC, useEffect, useState } from 'react';

type ProfilePageProps = {
  userId: string;
};

type ProfileProps = {
  userId: string;
};

const Profile: FC<ProfileProps> = ({ userId }) => {
  const [comment, setComment] = useState('');

  return null;
};

const ProfilePage: FC<ProfilePageProps> = ({ userId }) => {
  // 🔴 Avoid: Resetting state on prop change in an Effect
  // useEffect(() => {
  //   setComment('');
  // }, [userId]);

  // ✅ This and any other state below will reset on key change automatically
  return <Profile userId={userId} key={userId} />;
};

export default ProfilePage;
