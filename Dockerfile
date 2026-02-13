
# ----- Build Stage -----
FROM node:20 AS builder
WORKDIR /app

# Install Python and pip
RUN apt-get update \
    && apt-get install -y python3 python3-pip python3-venv \
    && rm -rf /var/lib/apt/lists/*

# Create virtual container for Python dependencies
RUN python3 -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Copy manifests
COPY package*.json requirements.txt ./

# Install dependencies
RUN npm ci
# RUN pip install -r requirements.txt

# Copy startup script
COPY startup.sh .
RUN chmod +x startup.sh

# Copy source code
COPY . .

# Build Next.js
RUN npm run build


# ----- Distribution Stage -----
FROM node:20 AS distribution
WORKDIR /app

# Install Python runtime only
RUN apt-get update \
    && apt-get install -y python3 \
    && rm -rf /var/lib/apt/lists/*

# Install Node runtime deps
COPY package*.json ./
RUN npm ci --omit=dev

# Copy runtime essentials
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/startup.sh ./
COPY --from=builder /opt/venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

EXPOSE 3000
CMD ["./startup.sh"]