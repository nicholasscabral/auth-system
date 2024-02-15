type GithubEmailObject = {
  email: string;
  primary: boolean;
  verified: boolean;
  visibility: 'public' | 'private';
};

type GithubEmailsResponse = Array<GithubEmailObject>;

export const getGithubPublicEmail = async (
  accessToken: string,
): Promise<string> => {
  try {
    const response = await fetch('https://api.github.com/user/emails', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'X-GitHub-Api-Version': '2022-11-28',
        Accept: 'application/vnd.github+json',
      },
    });

    const emails: GithubEmailsResponse = await response.json();
    const publicEmail = emails.find(
      (email: GithubEmailObject): boolean => email.visibility === 'public',
    )?.email;
    return publicEmail;
  } catch (error) {
    console.error('Error fetching user emails:', error.message);
    return null;
  }
};
