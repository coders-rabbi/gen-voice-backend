import { Follow } from "./follower.model";

const followReporterIntoDB = async (followerId: string, reporterId: string) => {
  const response = await Follow.create({
    follower: followerId,
    reporter: reporterId,
  });
  return response;
};

const unfollowReporterFromDB = async (
  followerId: string,
  reporterId: string,
) => {
  const response = await Follow.findOneAndDelete({
    follower: followerId,
    reporter: reporterId,
  });
  return response;
};

const getReporterFollowersFromDB = async (reporterId: string) => {
  const response = await Follow.find({ reporter: reporterId }).populate(
    "follower",
    "name email image", // যেই field গুলো follower থেকে দরকার
  );
  return response;
};

const getFollowerCountFromDB = async (reporterId: string) => {
  const count = await Follow.countDocuments({ reporter: reporterId });
  return count;
};


const getFollowingCountFromDB = async (followerId: string) => {
  const count = await Follow.countDocuments({ follower: followerId });
  return count;
};

const checkIsFollowingFromDB = async (
  followerId: string,
  reporterId: string,
) => {
  const response = await Follow.findOne({
    follower: followerId,
    reporter: reporterId,
  });
  return !!response;
};

export const followServices = {
  getFollowingCountFromDB,
  followReporterIntoDB,
  unfollowReporterFromDB,
  getReporterFollowersFromDB,
  getFollowerCountFromDB,
  checkIsFollowingFromDB,
};
