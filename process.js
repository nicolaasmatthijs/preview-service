#!/usr/bin/env node

/**
 * Copyright ©2016. The Regents of the University of California (Regents). All Rights Reserved.
 *
 * Permission to use, copy, modify, and distribute this software and its documentation
 * for educational, research, and not-for-profit purposes, without fee and without a
 * signed licensing agreement, is hereby granted, provided that the above copyright
 * notice, this paragraph and the following two paragraphs appear in all copies,
 * modifications, and distributions.
 *
 * Contact The Office of Technology Licensing, UC Berkeley, 2150 Shattuck Avenue,
 * Suite 510, Berkeley, CA 94720-1620, (510) 643-7201, otl@berkeley.edu,
 * http://ipira.berkeley.edu/industry-info for commercial licensing opportunities.
 *
 * IN NO EVENT SHALL REGENTS BE LIABLE TO ANY PARTY FOR DIRECT, INDIRECT, SPECIAL,
 * INCIDENTAL, OR CONSEQUENTIAL DAMAGES, INCLUDING LOST PROFITS, ARISING OUT OF
 * THE USE OF THIS SOFTWARE AND ITS DOCUMENTATION, EVEN IF REGENTS HAS BEEN ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * REGENTS SPECIFICALLY DISCLAIMS ANY WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. THE
 * SOFTWARE AND ACCOMPANYING DOCUMENTATION, IF ANY, PROVIDED HEREUNDER IS PROVIDED
 * "AS IS". REGENTS HAS NO OBLIGATION TO PROVIDE MAINTENANCE, SUPPORT, UPDATES,
 * ENHANCEMENTS, OR MODIFICATIONS.
 */

var PreviewAPI = require('./lib/preview/api');

var Logger = require('./lib/core/logger');

// Ensure all logging goes to the right process.log file
Logger.setProcessContext();

// The only argument to this file should've been the base64-encoded JSON-stringified Context data
var data = process.argv[2];
if (!data) {
  console.error('Missing data');
  process.exit(1);
}

try {
  var ctx = JSON.parse(new Buffer(data, 'base64').toString('utf8'));
} catch (err) {
  console.error('Invalid data');
  process.exit(1);
}

PreviewAPI.process(ctx, function(err, result) {
  if (err) {
    console.error('Failed to process the job');
    console.error(err);
    process.exit(1);
  }

  var output = new Buffer(JSON.stringify(result)).toString('base64');
  console.log(output);
  process.exit(0);
});
