import Poll from "../poll/poll.model";
import {
  IAnswer,
  TPollAnalytics,
  TQuestionStat,
  TResponseSummary,
} from "./poll-response.interface";
import PollResponse from "./poll-response.mode";

const submitPollResponse = async (
  pollId: string,
  answers: IAnswer[],
  respondentId?: string,
) => {
  
  const response = await PollResponse.create({
    pollId,
    answers,
    ...(respondentId ? { respondentId } : {}), // undefined হলে key-ই বাদ থাকবে
  });

  // poll-এর votes কাউন্ট বাড়ানো
  await Poll.findByIdAndUpdate(pollId, { $inc: { votes: 1 } });

  return response;
};

const getPollAnalytics = async (pollId: string): Promise<TPollAnalytics> => {
  const responses = await PollResponse.find({ pollId }).lean();

  const totalResponses = responses.length;

  // registered আর guest দুটো আলাদা array এ ভাগ করা
  const registeredResponses: TResponseSummary[] = [];
  const guestResponses: TResponseSummary[] = [];

  responses.forEach((r) => {
    // ✅ ঠিক এভাবে থাকতে হবে:
    const summary: TResponseSummary = {
      _id: String(r._id),
      answers: r.answers,
      createdAt: r.createdAt,
      ...(r.respondentId ? { respondentId: String(r.respondentId) } : {}),
    };

    if (r.respondentId) {
      registeredResponses.push(summary);
    } else {
      guestResponses.push(summary);
    }
  });

  const registeredCount = registeredResponses.length;
  const guestCount = guestResponses.length;

  const questionStatsMap: Record<
    string,
    { questionLabel: string; optionCounts: Record<string, number> }
  > = {};

  responses.forEach((response) => {
    response.answers.forEach((ans) => {
      const key = ans.questionId ?? ans.questionLabel;

      if (!questionStatsMap[key]) {
        questionStatsMap[key] = {
          questionLabel: ans.questionLabel,
          optionCounts: {},
        };
      }

      const currentStat = questionStatsMap[key]!;

      // CHECKBOX হলে answer array, তাই প্রতিটা selected option আলাদাভাবে গণনা
      const selectedOptions = Array.isArray(ans.answer)
        ? ans.answer
        : [ans.answer];

      selectedOptions.forEach((opt) => {
        const label = opt || "Other";
        currentStat.optionCounts[label] =
          (currentStat.optionCounts[label] ?? 0) + 1;
      });
    });
  });

  const questionStats: TQuestionStat[] = Object.entries(questionStatsMap).map(
    ([questionId, data]) => ({
      questionId,
      questionLabel: data.questionLabel,
      optionCounts: data.optionCounts,
    }),
  );

  return {
    totalResponses,
    registeredCount,
    guestCount,
    questionStats,
    registeredResponses,
    guestResponses,
  };
};

export const pollResponseServices = {
  submitPollResponse,
  getPollAnalytics,
};
