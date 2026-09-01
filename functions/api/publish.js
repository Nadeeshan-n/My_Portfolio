export async function onRequestPost(context) {
  const request = context.request;
  const env = context.env;

  try {
    const auth = request.headers.get('Authorization') || '';
    if (!env.ADMIN_PUBLISH_TOKEN || auth !== `Bearer ${env.ADMIN_PUBLISH_TOKEN}`) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'content-type': 'application/json' } });
    }

    const body = await request.json();
    if (!body || !Array.isArray(body.projectList) || !Array.isArray(body.educationList) || !Array.isArray(body.allSkills) || !Array.isArray(body.contactLinks)) {
      return new Response(JSON.stringify({ error: 'Invalid portfolio payload' }), { status: 400, headers: { 'content-type': 'application/json' } });
    }

    const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(body, null, 2) + '\n')));
    const url = `https://api.github.com/repos/${env.GITHUB_REPO}/contents/src/data/portfolioContent.json`;
    const current = await fetch(url, {
      headers: { Authorization: `Bearer ${env.GITHUB_TOKEN}`, Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' }
    });
    const currentData = await current.json();

    const response = await fetch(url, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${env.GITHUB_TOKEN}`, Accept: 'application/vnd.github+json', 'Content-Type': 'application/json', 'X-GitHub-Api-Version': '2022-11-28' },
      body: JSON.stringify({ message: 'Update portfolio content from admin', content: encoded, sha: currentData.sha, branch: env.GITHUB_BRANCH || 'main' })
    });

    if (!response.ok) {
      const error = await response.text();
      return new Response(JSON.stringify({ error: 'GitHub publish failed', details: error }), { status: 502, headers: { 'content-type': 'application/json' } });
    }

    return new Response(JSON.stringify({ success: true, message: 'Portfolio published successfully' }), { status: 200, headers: { 'content-type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Publish failed', details: error instanceof Error ? error.message : 'Unknown error' }), { status: 500, headers: { 'content-type': 'application/json' } });
  }
}
