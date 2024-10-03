FROM ubuntu:22.04

ARG versionNode=node_16.x
ARG versionPnpm=7.2.1
ARG versionGit=1:2.37.1-0ppa1~ubuntu21.10.1
ARG versionPactCli=1.91.0

ENV DEBIAN_FRONTEND=noninteractive \
    LANG=en_US.UTF-8 \
    LANGUAGE=en_US:en \
    LC_ALL=en_US.UTF-8 \
    versionNode=${versionNode}

RUN apt-get update && \
  apt-get install --no-install-recommends -y \
  docker.io \
  libgtk2.0-0 \
  libgtk-3-0 \
  libnotify-dev \
  libgconf-2-4 \
  libgbm-dev \
  libnss3 \
  libxss1 \
  libasound2 \
  libxtst6 \
  xauth \
  xvfb \
  build-essential \
  # install text editors
  vim-tiny \
  nano \
  # install emoji font
  fonts-noto-color-emoji \
  fonts-arphic-bkai00mp \
  fonts-arphic-bsmi00lp \
  fonts-arphic-gbsn00lp \
  fonts-arphic-gkai00mp \
  fonts-arphic-ukai \
  fonts-arphic-uming \
  ttf-wqy-zenhei \
  ttf-wqy-microhei \
  xfonts-wqy \
  sudo \
  curl \
  ca-certificates \
  # install locales
  locales \
  unzip \
  # clean up
  && rm -rf /var/lib/apt/lists/* \
  && apt-get clean

# Add GPG keys
COPY ./gpg-keys/ /tmp/

# Add Repositories
RUN sudo curl -fsSL https://deb.nodesource.com/setup_16.x | bash - && \
    # Install git Repo
    cat /tmp/git.gpg | gpg --dearmor > /etc/apt/trusted.gpg.d/git.gpg && \
    rm /tmp/git.gpg && \
    echo "deb https://ppa.launchpadcontent.net/git-core/ppa/ubuntu impish main" | sudo tee /etc/apt/sources.list.d/git.list && \
    apt-get update

# Install Git
RUN apt-get install -y git=${versionGit}

# Install Nodejs
RUN apt-get install --no-install-recommends -y nodejs && \
    corepack enable && \
    corepack prepare pnpm@${versionPnpm} --activate

# a few environment variables to make NPM installs easier
# good colors for most applications
ENV TERM xterm
# avoid million NPM install messages
ENV npm_config_loglevel warn
# allow installing when the main user is root
ENV npm_config_unsafe_perm true

# Generate missing locales
RUN locale-gen en_US.UTF-8

# Node libraries
RUN node -p process.versions

# Show where Node loads required modules from
RUN node -p 'module.paths'
