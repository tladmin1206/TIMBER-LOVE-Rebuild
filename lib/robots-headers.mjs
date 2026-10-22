/**
 * Indexing headers for timberandlove.com.
 *
 * Preview hosts (anything other than the apex and www) get
 * X-Robots-Tag: noindex, nofollow. The two production hosts do not.
 *
 * FORCE_NOINDEX=1 noindexes every host, including a staging box that answers
 * on a production-looking name. Replit shares secrets with deployments, so
 * that switch must never be compiled into a published build. A build with
 * FORCE_NOINDEX=1 and REPLIT_DEPLOYMENT=1 refuses to start.
 */

export const PRODUCTION_HOSTS = ['timberandlove.com', 'www.timberandlove.com'];

const NOINDEX = [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }];

/**
 * @typedef {{ source: string, headers: { key: string, value: string }[], missing?: { type: string, value: string }[] }} RobotsRule
 * @typedef {Record<string, string | undefined>} RobotsEnv
 */

/** @param {RobotsEnv} [env] */
export function assertIndexableProductionBuild(env = process.env) {
  if (env.FORCE_NOINDEX === '1' && env.REPLIT_DEPLOYMENT === '1') {
    throw new Error(
      'Refusing to build: FORCE_NOINDEX=1 together with REPLIT_DEPLOYMENT=1 would publish a noindexed production site. Unset FORCE_NOINDEX before deploying.',
    );
  }
}

/**
 * Sitewide robots rules. Admin noindex stays in next.config so this list
 * never has to know about /admin.
 * @param {RobotsEnv} [env]
 * @returns {RobotsRule[]}
 */
export function robotsHeaderRules(env = process.env) {
  if (env.FORCE_NOINDEX === '1') {
    return [{ source: '/:path*', headers: NOINDEX }];
  }
  return [
    {
      source: '/:path*',
      missing: [{ type: 'host', value: '(www\\.)?timberandlove\\.com' }],
      headers: NOINDEX,
    },
  ];
}

function hostnameOf(host) {
  return String(host || '')
    .split(':')[0]
    .trim()
    .toLowerCase();
}

/**
 * The X-Robots-Tag value a response for this host and path would send.
 * null means the header is absent. Production apex and www are null on
 * public paths. /admin stays noindex on every host.
 * @param {string} host
 * @param {string} pathname
 * @param {RobotsEnv} [env]
 * @returns {string | null}
 */
export function xRobotsTag(host, pathname, env = {}) {
  const path = pathname || '/';
  if (path === '/admin' || path.startsWith('/admin/')) return 'noindex, nofollow';
  if (env.FORCE_NOINDEX === '1') return 'noindex, nofollow';
  const name = hostnameOf(host);
  if (name === 'timberandlove.com' || name === 'www.timberandlove.com') return null;
  return 'noindex, nofollow';
}
