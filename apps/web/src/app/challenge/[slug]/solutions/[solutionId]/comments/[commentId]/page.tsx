import { auth } from '@repo/auth/server';
import { SolutionDetails } from '~/app/challenge/[slug]/solutions/_components/solution-detail';
import { Comments } from '~/app/challenge/_components/comments';
import { getPreselectedSolutionCommentMetadata } from '~/app/challenge/_components/comments/getCommentRouteData';
import { getSolutionIdRouteData } from '../../getSolutionIdRouteData';

interface Props {
  params: {
    slug: string;
    commentId: string;
    solutionId: string;
  };
}

export default async function SolutionPageComments({
  params: { solutionId, commentId, slug },
}: Props) {
  const session = await auth();
  const solution = await getSolutionIdRouteData(slug, solutionId, session);
  const preselectedCommentMetadata = await getPreselectedSolutionCommentMetadata(
    Number(solutionId),
    Number(commentId),
    Number(solution.challengeId),
  );

  return (
    <div className="relative h-full">
      <SolutionDetails solution={solution} />
      <Comments
        rootId={Number(solutionId)}
        type="SOLUTION"
        preselectedCommentMetadata={preselectedCommentMetadata}
        expanded
      />
    </div>
  );
}
